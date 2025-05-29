---
title: Creating a virtual fidget toy with Supabase realtime
author: Saunved
date: 2025-05-17
description: A mini-project using Supabase presence, broadcast, and some frontend magic.
image: virtual-fidget-toy.png
alt: A grid of cells of various colors
tags:
- featured
---

This week I spent some time experimenting with [Supabase Realtime](https://supabase.com/docs/guides/realtime), and decided to build a virtual fidget toy using some of their offerings.

## What is it? 
It's a grid of vibrant cells that you can click to turn on or off. You can visit the site here if you just want a demo: [Colors of the Internet](https://colors-of-internet.vercel.app).

![GIF of the grid](480p_colors_internet.gif)
Figure: A quick look at the grid

Now, that by itself could be fun - but what makes this exciting is that if someone else taps on a cell to turn it on or off, you will see the change happen on your screen too, in real time.

It's not just a virtual fidget toy, it's a shared experience connecting you to people interacting with the grid across the world, in real-time.
## Why?
Besides just the fact that it looks cool and feels cool, there are some real engineering challenges here. This concept is deceptively hard, and if someone had to build it from scratch (without something like Supabase), it might take them much longer than 2 days to create this.

What are the challenges?
- Showing how many users are online (quite easy with Supabase presence).
- Handling concurrency (multiple users interacting with the same cell should result in predictable behaviour).
- Ensuring eventual consistency across clients (all users should always see the exact same grid).
- Creating a smooth user experience (time for a cell to light on or off should be low after a click is made).

Let's break this down.
## Presence detection
Presence detection is a breeze with Supabase Presence. Whenever a user is online, we simply have to call the `track` method on a Supabase channel, and we're good to go.
I have added some extra checks to ensure a more accurate number by listening for the `visibilitychange` event in case users switch tabs.

![Showing how many users are online](presence-detection.png)
Figure: Showing how many users are online in real-time is a breeze
## The user journey
In order to understand how all the other challenges were solved, we need to dive into what happens when a cell is clicked.

Firstly, the cell toggles its state *immediately*. This is called an optimistic update. We are showing the end-user the final result even though that hasn't actually been stored in the database yet.

Secondly, a broadcast is sent to all other users who are online (using Supabase broadcast). This update is also ephemeral (i.e. no database is involved yet). Their local states are also updated to reflect the new state of the cell (on or off).

These two changes by themselves are fantastic at ensuring that the UX is smooth. However, if we leave it at this, any changes to cells will always be ephemeral. How do we persist them?

Well, roughly every second, a timer checks if the user has clicked on any cells. If they have, all of their updates are collected, batched together, and sent to the server to be stored in the database. You might be wondering why we're doing this every second, and not (say) every 10 seconds. This is because if a *new* user joins in the mean time, we want them to have the latest grid, not a snapshot of what it looked like 10 seconds ago.

And finally, every few seconds, the latest state of all cells is fetched from the database (polling). This is a fallback in case the broadcast isn't working as expected. This should be rare, but such mechanisms are crucial for ensuring that clients don't go out of sync due to a closed WebSocket connection. An important decision made here is that the sync is debounced, so the user's clicks are given priority over the latest database state.

We can also use Supabase realtime here on the "Cells" table, and I will consider this approach, but for now, polling is good enough.

## The tough parts
The above flow seems simple enough. However, there's a lot more going on in order for this to work smoothly. Let's dive into this a bit more.

First off - each cell has a version number associated with it. Each click on a cell will increment this version number. The reason for this is simple - if multiple people click on a cell within the same second, or milliseconds, and their broadcasted updates arrive at different times to each other, the version that has the highest value _and_ arrives last wins. This is a last write wins approach. Without this, updates that are received out of order can cause clients to show different cell statuses depending on when they are received.

Due to the nature of how DB calls are batched, it is entirely possible that the cell gets overwritten later because the call that reached the database *last* was of a different user. This is an acceptable trade-off for now. I can have users send incremented version numbers in database calls too, but I held off on doing this to reduce complexity.

Similarly, it is entirely possible that a user made a few clicks *while* their updates were being synced to the database. We can't just reset all their updates after the sync. We have to reset only those that were actually synced, and retain any other update that was made in the mean time (these will be synced later).

The same applies to broadcasts - if an update is received to a cell via a broadcast, but you also have an update on the same cell, that broadcast is ignored. It is left to the database to adhere to the last write wins strategy when the sync eventually happens.

## Dealing with low traffic
For low traffic situations, the site adds a few simulated clicks. I know it's not ideal, but I really like to turn this grid on my laptop, almost like a screensaver, and it's fun watching the randomness.

## Dealing with high traffic
I haven't done anything yet for high traffic, I don't really foresee this getting a lot of views, but if it comes to that, the current grid is actually 100x100, and we might be able to split people into different chunks of the grid to reduce the chaos in a single broadcast channel.

## Mistakes I made
I'm listing some mistakes I made in order to document them for my future self:
- I initially depicted all cells as a single string with 1's and 0's. This seemed like a great idea at the time to me because of the low memory footprint (which meant low bandwidth overall). However, it creates massive concurrency issues because each update rewrites the entire string. This was causing problems even with just 1 person updating the cells. 
- I held off on adding version numbers because I didn't think they would be needed. A simple test with two browser windows open in a split screen, with a few taps proved me wrong instantly. Even on my own laptop, locally, I could create flashes of cell updates that went back to the correct value after the DB sync.
- I avoided explicitly sending the state of the cell in broadcasts, choosing to just send whether they were toggled or not. This was kind of dumb since concurrency issues would result in weird intermittent states and cells flashing on or off randomly.
- I didn't want to add a cooldown on the cell clicks, because it felt less organic. However, it made sense to do it to provide a smoother UI.

## Things I learned
- Building realtime systems has become much easier than it was a few years ago, but if you have a lot of moving parts on a single UI (like in this project), figuring out the data model, optimistic updates approach, and determining sync logic requires a custom approach.
- I discovered the `useLatest` hook. I used to code this from scratch before, but it's nice to have it out of the box in the [react-use](https://github.com/streamich/react-use) library. This hook helps ensure that you have the latest value of any state variable within an async callback.
- I've decided to avoid the empty deps `useEffect`, and instead use `useMount`. I know this seems silly, but being able to tell the purpose of a hook by reading its name is criminally underrated.
- Creating the initial schema with Typescript (without AI), and then using Claude to generate Postgres tables works amazingly well. I created a prompt template for generating PG migration files which I'll be using a lot going forward.
- I also experimented with `pg_cron` in the nascent stages of this mini-project. It's quite useful for scheduling, and I can see it helping me a lot in other projects.
- [Preact signals](https://preactjs.com/guide/v10/signals/) are a really neat way to surgically update the UI. I am not entirely sure if I've used them in the right way in the project, but well, we live and learn.

## What's next?
Honestly - nothing. There are still many edge cases here, but it feels good to just create and deploy a mini-project and not worry about maintaining it. I did this to learn some concepts that I have been itching to explore, and that feels great.

If you want to check out the source code and run this repo locally, you can find it here: [GitHub](https://github.com/Saunved/colors-of-internet).