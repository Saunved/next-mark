---
title: "Open sourcing my blogging setup: next-mark"
description: My journey of creating a generic Markdown-based blogging tool on top of Next.js  
author: Saunved
date: 2025-01-13
image: kite.jpg
credit: Photo by <a href="https://unsplash.com/@ustuntas?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Murat Ustuntas</a> on <a href="https://unsplash.com/photos/photo-of-white-blue-and-red-kite-under-blue-sky-NqRgrAHdGRo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
alt: Kite flying in the sky
tags:
  - featured
---
This Sunday, I finally made my Markdown-based blogging setup open source. My journey started back in December of 2022, when I wanted to move away from Medium due to their terrible editing experience, lack of customizability, and feed algorithms that promote click-bait over quality.

## Exploring what's out there
I began by exploring other hosted blogging platforms such as Ghost, WordPress, Substack, and HashNode, but I was either dissatisfied with the control over customization, hosting, distribution, or just the quirks of the platforms and their pricing.

I use Obsidian to write my notes, and I firmly believe that the format I write my content in should be easy to edit, backup, import, and export, which essentially narrows down the list of formats to just [Markdown](https://en.wikipedia.org/wiki/Markdown).

I also wanted to ensure that my files were not stored in a proprietary CMS or even in a database, because that creates limitations that aren't worth the trouble for an indie blog.

Given these constraints, I began exploring what's out there. Over the next few weeks, I discovered the world of digital garden frameworks. Frameworks like [Quartz](https://quartz.jzhao.xyz/), [DigitalGarden](https://dg-docs.ole.dev/), [FlowerShow](https://flowershow.app/), and many others, offer, to a large extent what most knowledge workers might desire to show-case their writing.

Although these are fantastic, I felt like I needed more control over the final output. Some of these frameworks were still in the early stages of development back then, or they lacked key features which I wanted to bake into my blog. Others focused purely on digital garden creation, rather than blogging, which was my primary use case.

I could have compromised on some aspects of my requirements, but I had some prior experience with writing custom logic for rendering a blog using Jekyll, so as long as I could power through the hard parts, I was sure I could get it done. I took some inspiration from Quartz when setting up this framework, so I want to thank the creator for creating a wonderful digital garden framework!

## The first iteration
In the last week of December 2022, I actually did finish setting everything up, and had my blog up and running using Next.js + MDX + Tailwind. By January of 2023, I had setup the navigation, layout, and added support for dark mode, as well as the basic SEO, which also included canonical URLs.

With projects like these, it is important to get things working first (and fast), even if they're not generic.

Now that the blog was up and running, I would have to solve these problems:
1. The blog wasn't easily configurable. A different programmer couldn't just fork the repository and start writing with minor setup steps. 
2. The navigation system wasn't very good. I had setup some weird logic with "series" and "categories", which was quite counter-intuitive, and would have to be rethought.
3. A blog should allow for email collection for building a subscriber list.
4. The editing experience wasn't ideal. I had to use VSCode to edit and preview content instead of a simple note-taking app due to the nature of MDX.

## Adding tag-based navigation
I took a 6-month gap until June of 2023. When I got back to the project, I faced a popular conundrum. Should I enforce a flat-file structure, or should I support nested folders?

This is a common issue and there are plenty of people on [both sides of this argument](https://www.reddit.com/r/ObsidianMD/comments/u79m8v/are_you_using_a_folder_structure_or_a_flat/), but most importantly, there are plenty of people who say they prefer *both*, and I agree with them.

I decided to add a simple tag-based system for the flat-filers. If they wanted to semantically organize their posts, they could group them by tags and link to the tag pages.

![Tag-based-navigation screenshot](tag-based-navigation.png)
Figure: Tag-based navigation: notice the URL

Later, in June of 2024, I would add support for folder-based navigation to help those who like to organize upfront (more on that later).

I also worked on the following things:
- Support for [Buttondown](https://buttondown.com/) email collection for building a subscriber list.
- I was running into issues with image handling. Initially, I had put all my images on a S3 bucket and linked it to Cloudfront, but I realized that I was forgoing the benefits Vercel offers out of the box with respect to image optimization, so I switched back to supporting images stored in the same repository.

After that, for almost a year, I ignored the project altogether, until I found some inspiration again in June of 2024.

## Making things generic
June-July 2024 was when I did a lot of work for getting this project to be generic and much more configurable. These are some of the things I worked on:

- I moved away from the default Next.js MDX rendering to pure Markdown. Pure Markdown meant that I (and anybody else who decided to use this setup), could write their content on any decent note-taking app, be able to see their previews locally, and expect them to render in an almost identical fashion on the website.
- Added a "Related" posts section on each post page, these posts would show up underneath any given post as long as they shared at least one tag in common.
- I also focused on centralizing where the config was stored (e.g. in "blog.config.mjs" instead of in multiple different places), to help make setup easier.
- Added support for draft states so people could store their draft files and folders in the same place without worrying that they would get published.
- Added support for captions below images, tables, and code snippets.
- Added support for aliases and canonical URLs.
- And, I finally added support for folder-based navigation.

![Folder-based navigation screenshot](folder-based-navigation.png)
Figure: Nested folder navigation

Everything was almost ready, and then, as usual, I decided to take another break from the project.
## Open sourcing time!
In January 2025, 6 months after my previous burst of motivation, I decided that it was time to open source the project.

The primary reason behind open sourcing this project is to give back to the community. I have used countless fantastic tools and frameworks over the years, graciously open sourced by thousands of developers world-wide.

I believe that having a plethora of options when it comes to static site generators and blogging options is crucial for an open internet, and authors who publish on hosted platforms can still leverage such frameworks to maintain alternate links to copies of their work. This is also a key reason why support for canonical URLs was added very early to this project.

Another benefit open sourcing had was it forced me to think of more use cases and edge cases. It allowed me to patch some potential bugs, and motivated me when I didn't feel up for it. So I polished things up a bit, patched bugs, wrote the README, and changed the repository's visibility to public.

If you want to try out this framework (note that it is in alpha at the moment), please head over to https://github.com/Saunved/next-mark. The setup steps are written in the README.

You can also see a demo of the content structure here: https://github.com/Saunved/next-mark-demo.

## Next steps
I am hoping to add the following features to this setup over the coming year:
1. More options for page layouts,.
2. Centralizing the config even better, and perhaps retaining it in the "content" folder instead of the main repository, so people only need to worry about one folder.
3. Adding a site-wide local search.
4. Adding a sitemap (yes, this is *very* basic and crucial, but it's also really boring).
5. Adding support for page meta to prevent AI data scraping (at least for the ethical companies).
6. Automatic generation of table of contents.
7. Support for footnotes (references).
8. Support for showing backlinks.
9. Allowing for an easy way to override the default rendering logic (custom components), which can override upstream changes.
10. ... and a whole lot more!

---

This setup is still in its nascent stages, and there are plenty of things that can be done to optimize it and make it much, much cooler!

Don't forget to leave a star if you like how it works, and do feel free to file issues or create PRs if you'd like to contribute!
