---
title: "The myth of defaults"
description: My thoughts on customizability in software, and why it matters.
author: Saunved
date: 2025-04-10
image: the-myth-of-defaults.jpg
credit: Illustration by <a href="https://unsplash.com/@heathergreengreen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Heather Green</a> on <a href="https://unsplash.com/illustrations/colorful-and-various-geometric-shapes-BevqDq3PKvA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
alt: The myth of defaults
tags:
  - featured
---

Last week, I was trying to setup a WiFi mesh using Deco. I had previously done this setup and had to reset it multiple times since it was not working as expected and disconnecting frequently.

I started digging through the advanced settings in the Deco app as well as posts on [Reddit](https://www.reddit.com/r/TpLink/comments/1ddvacv/psa_decos_should_use_access_point_mode_if_using_a/), and discovered that the router mode is the default, which can cause issues if you have an already existing router, and what I actually needed was the "Access point mode".

Why was the "router mode" the default? Why wasn't the access point mode presented as a choice during or after setup? There may be good reasons as to why - but do they *always* make sense?

## What's in a default?
The term default has a strange comfort associated with it. If it's a default, it means it will work, at least for most people.

Defaults are a starting point. When you're dealing with a new app, a new library, or a new programming language, not having defaults can be daunting. Without these, you must hunt through documentation, read descriptions that make no sense, and do a bunch of trial and error to figure out what works. 

Most software ships with a default configuration. Your TV, your phone, your fridge, your microwave, your Wi-Fi router, and your code editor, pretty much all of them, ship with some defaults.

In most cases, most people never look for ways to change these. Sometimes it's a fear of changing the settings in a way that you can't get them back. Anyone who has changed the language on their phone to a script they can't understand knows the panic that comes with it.

Most defaults should work well, most of the times. However, people may be forced into figuring out how to customize. Accessibility is one such use case. Voice readers are off by default for most phones, but if you're visually impaired and have a new phone...this default makes no sense.

## What's not in a default?
If you're not tech savvy, you're not opening any "Settings" unless something has gone terribly wrong. Why fix something that ain't broken?

However, the true magic of usable, lovable software lies in your curiosity to change the very defaults that you are comfortable with. Many people do this already. Changing your wallpaper is moving away from the default. So is changing your phone's font size, or what the "power button" does. However, as with most things in life, customizability is layered.

Depending on your curiosity and love for tech, you might fall into any one of these.
![Layers of customizability](customize_layers.jpg)
Figure: Layers of customizability (my take!)
## Customization is a two-way street
For consumers of a software product to care about customization, the creators of said software product should also care about customization and offer ways to achieve it easily.

Minecraft, for example, when opened for the first time, launches with the Narrator on by default. For people who don't need the narrator, it's a matter of simply dismissing it - a small inconvenience, compared to what a visually impaired person might have to deal with. In Minecraft's case, the trade-off is non-negotiable.

However, not all customization needs to be so explicit. The onus of educating users about what's customizable then, lies with the creator.

Vivaldi browser, for example, takes this to the next level by offering ways to customize pretty much any behavior of the browser, but organized beautifully in a searchable GUI.

Android phones (most of them), are popular precisely due to the level of customization they offer. It's your phone, you should be able to use it how you please.

However, there are softwares that offer deep customizability, but do not expose this easily. You have to care deeply, and [show curiosity if you wish to customize](https://allenthomas.vercel.app/posts/taste). The Neovim editor is one such example. Customizing it is a journey, often one that never really ends. 

Software that offers deep customizability, but requires effort from the consumer, thrive on helpful, vibrant communities, which for example, both Neovim and Emacs have.

![A graph of levels of user customization in software](default_software_spectrum.jpg)
Figure: What I think software customizability looks like today
## All roads lead to customization
I believe that over time, offering deep customization will become increasingly common. Part of the reason for this is that it helps businesses by improving user retention.
The advent of LLMs, which offer relatively easy ways to discover hidden settings in a knowledge-base (provided they're not hallucinating), can accelerate this trend.

Along with this, most mature apps today have reached a saturation point in terms of what can be done from a UX perspective. You can adjust dials and knobs and run A/B tests, but you can't make *everyone* happy with the defaults. When you're working with millions of users, [even one percentage matters](https://medium.com/thinking-design/why-i-dont-believe-in-empathic-design-c3dd0a956de9). If your product is mature, you can't change the defaults easily. Users will complain. Even if the new default is "better", it may not be perceived that way. As a result of this, a new "setting" might have to be created.

Some engineer or product manager working at TP Link believed that all Decos will almost always run as routers, without realizing that many consumers might already have one at home, and a mesh is often times an after-thought. They could've offered a choice up front and made this more discoverable - but a lack of foresight, feedback, or a terrible conscious decision prevented them from doing so.

Default choices made by someone who doesn't share your preferences, identity, or life experiences, driven purely by "business goals" cannot stand the test of time. Good apps will acknowledge this and offer choices at the right places, in an organized fashion - or if that is too much work, at least let you know that the choice exists.


![User preference diversity](user-pref-diversity.jpg)
Figure: User preference diversity, illustration by [Sharvari](https://shara.page)

Good software offers good defaults. 
Great software offers good defaults, with deep, discoverable customizability or a vibrant, helpful community. 
This, for me, is a necessity for any software to stand the test of time.