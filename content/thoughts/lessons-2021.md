---
title: 70 lessons from the last year as a developer and co-founder
description: Organized by life, business, tech, and UX
image: 70-lessons.jpg
credit: Photo by <a href="https://unsplash.com/@hudsoncrafted?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Debby Hudson</a> on <a href="https://unsplash.com/photos/pile-of-books-beside-white-printer-paper-and-black-ballpoint-pen-asviIGR3CPE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
alt: Books and a diary on a table
author: Saunved
date: 2021-07-09
canonical: https://dev.to/saunved/70-lessons-from-the-last-year-as-a-developer-and-co-founder-5h2h
---

This time last year, we changed our business model and began partnering with small businesses and startups to create tech solutions for them. 

This is an exhaustive list of things I've learned since then. The process of writing and organizing these helped me process the learnings better, and I hope it helps someone out there too.

A few of these things might seem like common sense, but I learned them from experience so they had an impact on my behavior or my understanding of my work and life in general.

* * *

Organized by
1. [Life](#life)
2. [Business](#business)
3. [Tech and UX](#tech-and-ux)
4. [Tech for everyone](#tech-for-everyone)
5. [Tech for developers](#tech-for-developers)

* * *

## Life
* Communication is crucial for your survival in any profession. Just talk to people you're working with (or for) about your tasks. Drop them a message once a day at least and keep them in the loop, especially if you're going to be late with something.
* Most difficult problems are solved when you periodically step away and do something else for a bit.
* Coffee is your friend as long as it doesn't mess with your sleep cycle
* Writing your own tasks down on paper and crossing them out is more efficient and rewarding than any online tool.
* Walk around the house if you're on a phone call. It helps keep you active.
* Spending some time every day looking at trees and plants is very soothing.
* Hugging your pets at random intervals during the day is a free dose of happiness.
* An 18-minute nap in the afternoon does wonders for productivity
* Time tracking (using a tool like Toggl) for personal analysis is very useful. You begin to learn how you spend or waste time and even understand how to estimate time for tasks correctly.

## Business
* Making an app or website for someone doesn't guarantee them sales, and convincing them otherwise can lead to very difficult conversations about their business model.
* More effort doesn't equal more reward. Pick your work wisely.
* Getting your personal, relationship, and business goals to align will take a toll on your mental health. It's best to process this in a healthy way. Talking to someone, writing about it, or simply being aware of what's causing you to feel a certain way helps a lot.
* If you can write well in at least one language, you can usually do well in any desk job. If you don't write well, start practicing. If you can't write well, focus on calling people and talking more on the phone. Either way, communicate.
* Running a startup means dealing with the fear of failure and doubt every day. That's okay. It can get better as long as you learn from it and communicate with your cofounders.
* Lesser-paying contracts can sometimes give way more happiness than higher-paying ones. Who your customer or client is matters a lot.
* A good designer can do wonders for your product. Don't hesitate to hire designers even if you are "decent" at design.
* Always get written contracts before starting any work. Verbal contracts and handshake contracts leave room for miscommunication.
* Always tell the truth about timelines. If something is going to take 8 weeks, don't say you can do it in 4 weeks.
* Always take an advance before starting any project. Decide your amount. For large contracts, 10% can be okay. For small contracts, 50% is good, but always take an advance.
* Adapt to the client's style of communication instead of forcing them to use a particular app or website. If your client likes email, use email. If they like Whatsapp, use Whatsapp. You'll just speed things up for yourself down the line.
* UI is what you interact with. UX is how you feel after you interact with it. The thinking processes involved in both are vastly different. Try NOT to use these terms interchangeably because they mean different things.

## Tech and UX
* Encourage designers/yourself to make designs for mobile-first (especially for websites). It's always easier to expand from a place of constraint than to contract design from a large space.
* Menu buttons should ideally be labeled "Menu" if they contain important links that cannot be found with other actions
* Users forget their passwords. Allow them to sign in through magic links too.
* Fall into the habit of writing user feedback loops. Basically, if the user does something, open a toast telling them that it's done. A simple "Data updated" toast builds trust with your system.
* Fall into the habit of adding loaders wherever network calls are made. It's super annoying to press a button and have nothing happen for 1 second. I have seen plenty of reputed websites that somehow think it's okay to do this.
* If an error occurs on a user action, NEVER show it as a disappearing toast. Make it persist on the screen until the user manually clears the error
* Don't use words like "Cancel" in a dialog box. Use "Back" instead. "Back" is comforting, it's a casual escape. "Cancel" is ambiguous and brings an alarming feeling, as if the user is doing something wrong.
* Always use the combination of "Sign in" and "Register". Never use "Sign in" + "Sign Up" or "log in" + "sign up". It's not easy on the eyes
* Have separate forms for registration and signing in, preferably on separate pages instead of in modals (for SEO purposes)
* Keep an easily accessible "Feedback" button in your application so users can report bugs and issues 
* Well-tested user interfaces require fewer updates and are a joy to use even if they don't "look" great
* Always make sure your site has a navbar and a footer, otherwise it looks "naked"


## Tech for everyone
* Never buy hosting from GoDaddy. Use DigitalOcean or Vercel or Vultr
* Buy domains from Google or Namecheap.
* Web apps are not worth the hype until Apple decides to adopt and support them properly. You will still need an "app" to give an app-like experience with push notifications and other permissions on iOS.
* The largest delays in development and testing times are caused by third-party dependencies (e.g. payment gateways, email delivery services, etc.). Make sure you have all the documentation, approvals, and data formats available before the developers start coding anything.
* Live streaming is complicated, especially if there is an authentication layer associated with the stream. The most affordable custom live-streaming services I've found are OneStream, LivePush, and Castr.
* WordPress is still better than about 95% of the new content management systems out there (for general use cases of course).
* Strapi is a decent choice for a custom CMS, but it is by no means bug-free, especially when it comes to nested queries in GraphQL or renaming collections, or developing locally. Look for lighter alternatives before you get here.
* When most people say "AI", they usually mean "ML". When most people say "ML", they usually mean dynamic output based on user-input (which is basically a bunch of "if-else" statements).
* The concept of a blockchain is great, but 99% of the things you want to use blockchains for don't need a blockchain in the first place.
* No-code is a dangerous buzzword. If you want to do anything even slightly different (which is most things when you get into the details), you have to use code.
* After spending a copious amount of time convincing myself that NFTs are actually useful, I have concluded that they are worthless and anybody telling you otherwise just wants to make quick money and disappear.

## Tech for developers
* Bundle your "admin" frontend with your normal user-side code. Creating a separate project means you probably won't maintain it properly.
* Brand new frameworks and libraries will fail you by virtue of being less tested or documented. Test them out in a sandbox for your use case first.
* Authentication on the web is a rabbit hole. Use cookies set by the server with httpOnly if you're confused.
* The Safari browser is the new Internet Explorer (at least for developers) due to poor support for modern CSS and JS features.
* The AWS documentation and UX needs a massive revamp. Also, avoid using AWS if you can.
* Utility frameworks (like Tailwind) are surprisingly good, but it's okay if you don't like them. Each to his/her own.
* The command line is a beautiful gift and you should definitely use it more if you don't already. Try it out for common tasks, stick to it for a few days, you won't feel like giving up the convenience.
* It helps to know at least one frontend framework, one backend framework, and one database. You'll be able to associate other "new" things with the existing ones if you need to later on.
* You "know" a framework when you deploy at least two projects to production and maintain them for a few months with 100+ monthly active users.
* If you don't want to stress out about there being a bug in your production, then, well... don't stress out about it. If there's a bug, it'll be reported eventually, and you will fix it eventually. Worry about it then.
* Most new bugs are introduced when fixing old bugs in a hurry. So test thoroughly and save yourself time later on.
* Backups. Always. Have. Backups. Especially if you're not quick on your feet. Doesn't matter where you are, who you are. Make it a part of your thinking process. Also, know how to restore those backups. Backups are restored rarely, but also in time-critical situations. So keep the steps written down somewhere you can find them later on.
* Serverless doesn't seem to be the future because of database, job scheduling, and management constraints.
* Coding slowly allows you to finish tasks faster than coding "fast" which just causes issues to crop up later and consumes more time overall.
* The less code you have in your codebase, the easier it will be to debug.
* Don't start coding a new module until you have a bird's eye view and the next 3 steps you're going to take and you fully understand the side effects they will have on the existing system.
* Note down crucial decisions in a README that is version controlled and update it every time you have discussions. We've tried saving crucial decisions in emails, in Confluence, in ClickUp, on Jira. None of these things work. Keep the decisions with your code. They will always be accessible.
* Try to figure out what's different between your development, staging, and production environments to avoid issues with deployments.
* Set release cycles for your products. E.g. every alternate Wednesday. Never deploy immediately before a vacation or a weekend.
* Replicate the prod database locally to test things out in a "real way"
* If you're coding in a hurry, you'll end up sacrificing on security since it's easy to overlook. Make sure you come back to do a security check later
* End-to-end encryption is complicated and causes lots of user experience issues, backup and restore issues, and maintenance headaches in general. If you don't need end-to-end encryption, don't use it.
* Don't buy SSL certificates unless there's a very good reason to do so. Free Let's Encrypt certificates are enough for most use cases.
* All frontend frameworks are pretty much similar in performance. Use what's convenient and what works for you.
* Event-based systems are easier to handle than implicit update systems (e.g. computed properties in Vue). Emit and consume events wherever possible to make your system easier to trace, predict, and debug. This is very useful with complex systems where computed or watched properties can end up in infinite loops.
* Debouncing is very useful when dealing with scroll effects or multiple simultaneous event updates. It allows the interface to update while delaying the execution of the tasks by a reasonable time.

* * *

I know this was a long read! Feel free to leave your thoughts on the list, especially if you strongly agree or disagree with something.
