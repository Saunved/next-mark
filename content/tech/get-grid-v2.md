---
title: Updates to get-grid
description: Supporting HTML tags, components, and IDs to create CSS grids in the CLI
canonical: https://dev.to/saunved/updates-to-get-grid-and-its-query-format-4n29
author: Saunved
date: 2020-06-02
image: get-grid-v2.jpg
credit: Photo by <a href="https://unsplash.com/@timmossholder?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tim Mossholder</a> on <a href="https://unsplash.com/photos/multicolored-glass-window-QHPVnH9pLew?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
alt: Colored windowpane grid
---

A few days ago, I wrote about [get-grid: a CLI tool for creating CSS grid layouts](https://dev.to/saunved/a-cli-tool-for-creating-css-grid-layouts-2aj4). A lot of people liked the idea and I got some good suggestions in the comments and on Github.

This post outlines the updates to the query format of get-grid.
## Table of contents
* [The problem](#the-problems)
* [The solution](#the-solution)
* [The new format](#the-new-format)

I will try to outline problems with the previous query format and show you how the new changes will solve these. If you want to code along, you can install the development version of get-grid:
```shell
npm i get-grid@next -g
```

## The problem
The previous query format looked like this:
```sh
get-grid --class "container" --query "header/sidebar-content-content/footer"
```
and gave us this output:

![Dynamically generated layout](get-grid-2-screenshot.png)

The "/"s indicate a new row and the "-"s indicate a new column. This creates some interesting problems:
* We cannot specify classes with a "-"
* We cannot write a query that contains custom HTML tags (e.g. web components) or semantic HTML
* We can define a container "class", but not an ID or a custom selector
* A default margin, padding, background color is being added which many people will ultimately end up removing

In short, **the majority of the problems concern the fact that the query defaults to classes as selectors**. This can be solved by removing "-" as the separator for columns and by using a little "emmet" magic.

Thanks to [the Github issue by taneltm](https://github.com/Saunved/get-grid/issues/1#issue-627991556) for the suggestions that led to the improvements.

## The solution
Let's get rid of the main blocker: the "-" and replace it with a comma. We now end up with this query:
```shell
get-grid --query header/aside,content,content,content/footer
```
Once that's done, let's use our standard CSS selectors instead of assuming that everything is a class.
So, we can do:
```shell
get-grid --query header/aside,.content,.content,.content/footer
```
You can also use #ids, and classes with a "-" or web components if you wanted to. The query will pick up your code and generate the HTML and CSS correctly.

Let's give it a try, shall we?
```shell
get-grid --container "body.desktop-site" --query "header/#sidebar,.content,.content/.footer-left,.footer-middle,.footer-right" -dH
```

the **-d flag** requests get-grid to **add a default margin, padding**
the **-H flag** requests get-grid to **add a background color and to name the areas** in HTML

This is the code spit out:
```html
<body class="desktop-site">

    <header>header</header>
    <div id="sidebar">#sidebar</div>
    <div class="content">.content</div>
    <div class="footer-left">.footer-left</div>
    <div class="footer-middle">.footer-middle</div>
    <div class="footer-right">.footer-right</div>
    
</body>
```
```css
    body.desktop-site{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr ;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
    }
    header{
    grid-column: 1 / 4;
    grid-row: 1 / 1;
    padding: 1.5rem;
    background: #eaeaea;
    }
    #sidebar{
    grid-column: 1 / 2;
    grid-row: 2 / 2;
    padding: 1.5rem;
    background: #eaeaea;
    }
    .content{
    grid-column: 2 / 4;
    grid-row: 2 / 2;
    padding: 1.5rem;
    background: #eaeaea;
    }
    .footer-left{
    grid-column: 1 / 2;
    grid-row: 3 / 3;
    padding: 1.5rem;
    background: #eaeaea;
    }
    .footer-middle{
    grid-column: 2 / 3;
    grid-row: 3 / 3;
    padding: 1.5rem;
    background: #eaeaea;
    }
    .footer-right{
    grid-column: 3 / 4;
    grid-row: 3 / 3;
    padding: 1.5rem;
    background: #eaeaea;
    }
```

And this is what we get when we paste it to HTML:
![Dynamically generated grid](get-grid-2-screenshot-2.png)

And yes, the generated HTML respects the selectors and generates code the way emmet would (because the emmet library is being used to generate the HTML!).

## The new format
I feel like the query format is slightly more "complete" now. In case you need a quick reference:
* / to indicate a new row
* , to indicate a new column ( previously '-' )
* selectors must be specified explicitly (i.e ".class" instead of "class"). You can specify IDs and HTML tags the way you would while writing CSS selectors.
* The container is specified using --container (or -C) instead of --class. You can specify any valid CSS selector for the container
* The default padding/margin and colors are removed. You need to use the -d and -H flags to get those in your CSS

You can read the help provided along with the tool:
```shell
get-grid --help
```
It outlines some other flags that allow you to get only the style, or only the HTML, or print output to the terminal, etc.

**How much less code are we writing?**
If we look at the query above, it consists of 129 characters. It generates a layout with 1132 characters of code. That's **8.7 times less code to write**!

* * * 

There are some other enhancements that can be made to the query format (such as being able to specify heights and widths for rows and columns). I will be working on this in the coming weeks.

* * *

The next stage would be to write a basic test suite and to find out other problems with the query format. Check out [the Github repo here](https://github.com/Saunved/get-grid). I'd love to work on more enhancements and to fix any existing bugs. Feel free to fork and create pull requests and don't forget to mention if you are working on something! 

Do leave a star if the tool helps you :)
