---
title: Four weeks with Neovim and a comparison against VSCode
description: I tried using Neovim for 4 weeks and developed a feature to get a feel for the code editor.
date: 2024-07-07
image: /neovim.jpg
credit: Photo by <a href="https://unsplash.com/@oskaryil?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Oskar Yildiz</a> on <a href="https://unsplash.com/photos/turned-on-gray-laptop-computer-cOkpTiJMGzA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
## Why Neovim?
The short answer is, I saw [ThePrimeagen](https://www.youtube.com/c/ThePrimeagen) using it very effectively. I was also inspired by a [coworker](https://x.com/allenytics) to try it for some time to see if it made a difference in my productivity.

I went into this experiment knowing fully well that I would never be as productive with Neovim as I am with VSCode for at least 6 months. So this post is more about the developer experience that I had with Neovim.
## Some background
I was already familiar with vim motions, having done the Vim tutorial a few times in the past, and also having tried the plugin for VSCode, so getting used to *vim* wasn't a challenge during this experiment.

For the 4 weeks that I tried out Neovim, I did *not* open VSCode for anything unless it was critical. I tried coding in JavaScript and Clojure for my experiment, and these thoughts are based purely on that experience.
## The setup
I wanted to get a quick feel for the editor, so I opted for a default setup using LazyVim. Over the period of a week, I tweaked LazyVim slowly, adding and removing plugins, until I was satisfied with the entire setup. I won't go into the details of all the Neovim plugins that I tried out. Shout-out to these plugins that I found to be a game-changer for me: [leap](https://github.com/ggandor/leap.nvim), [lazy-git](https://github.com/kdheepak/lazygit.nvim), [neo-tree](https://github.com/nvim-neo-tree/neo-tree.nvim), [which-keys](https://github.com/folke/which-key.nvim) and [nvim-scrollview](https://github.com/dstein64/nvim-scrollview).

I also installed the [kitty](https://sw.kovidgoyal.net/kitty/) terminal.

## Week 1
Week 1 was the hardest. I had trouble understanding how to install new plugins, how to configure them for my workflows, and how it all fit together. Thankfully, the [dotfyle](https://dotfyle.com/) website made discovering plugins a breeze. 

By the end of Week 1, I felt like I had a fair grasp of how things worked, and I was able to navigate throughout projects and files fast enough.

During this week, I struggled with the concept of buffers and windows, often times using the wrong command for the wrong thing. This got better over time though.

## Week 2 and 3
In these two weeks, I actually coded a feature end-to-end. Not using a mouse was a weird feeling at first, but leap was a wonderful way to navigate through the code.

I sorely missed VSCode's global search UX, and I tried various ways to get as close to that experience as possible. I found live grep to be the most useful of them.

Similarly, the global find and replace was also a pain to use. Again, this is where VSCode really shines. Having buttons to quickly configure case-sensitivity, and regex is quite useful, so is the ability to exclude and/or include specific files.

I tried out [Spectre](https://github.com/nvim-pack/nvim-spectre) for this, and although it was good, it didn't match up to the experience I am used to, and I didn't see myself operating at the same speed using Spectre or any of the other global find-and-replace plugins or the Vim command(s) that I tried. 

This was also the week where I discovered LazyGit. Although one can use LazyGit independently, having it open inside Neovim was wonderful. I can safely say this experience was superior in many regards to VSCode's default Git UI.

I also found that Neovim often broke after plugin updates, and it wasn't easy to discover why. This happened to me thrice in 2 weeks.

## Week 4
By Week 4, I was ready to try out Clojure in Neovim. I installed the [Conjure](https://github.com/Olical/conjure) plugin, and after 2 days of really trying hard to make it work for me, I decided that it wasn't worth it. I have tried Clojure in Emacs and in VSCode, and both of those experiences are vastly superior to what Conjure has to offer. It was a huge disappointment for me.

I often ran into cases where my local leader key just would not be obeyed, or the expression would just not evaluate despite being connected to the repl. I am also not a fan of showing the output in a temporary floating window (this does have a workaround, which should be the default according to me).

The Conjure onboarding and documentation also needs to be much better for complete beginners like me. Having good documentation is non-negotiable and the documentation must provide excellent examples of how a tool can be used.

## Conclusion
Neovim was a wonderful experience for learning a completely new code editor. I think in the long run, it would make code navigation faster for me, but I don't think it would be *that much* faster compared to my existing VSCode setup.

These are some of the reasons why I would like to explore Neovim again in the future:
- The low memory footprint is the clearest winner. It hardly takes up any RAM, and on a hot summer day, when your laptop is struggling to keep up, this is a winner.
- Vim motions (although not new to me), reinforced their superiority in many ways, and I will continue to use them in VSCode every now and then.
- The deep customizability is amazing, and I tried out lots of personalized key combinations and plugin options over this period of time.
- Similarly, there are multiple ways to do the same thing, and having a choice is usually always good as long as you can find the thing you're looking for.
- The quickfix list is a very interesting concept, and I would love to explore it more.

That being said, these are some of the reasons **why I will be sticking to VSCode as my daily driver**:
- Adding JSDoc comments is far more intuitive. The Nvim plugins that I tried just attempted to emulate VSCode, and they didn't do a good job.
- Autocompletion UX is better. Nvim doesn’t know when to keep or remove the autocomplete dropdown and pressing Esc puts you in normal mode, which is absolutely annoying. If there is a different key for dismissing the autocomplete menu, I'd love to find out, but the default needs to be good out of the box.
- Symbol renames are easier in VSCode. Nvim only allows “Insert” mode for symbol renames, which nullifies the whole point of Normal mode motions.
- Auto-indenting when you paste code is better. Nvim sticks the first line to the start for some reason, and I am not sure what the workaround here is. I know that other editors take care of this out-of-the-box, as they should.
- The buffer refresh logic is better in VScode (Nvim sometimes shows older warnings and errors until you reload the buffer).
- Global search and replace is much better and easier to visualize in VSCode, especially when it comes to regex and case-sensitive search UX.
- Multi-cursor is highly intuitive, and takes care of most use-cases. Macros are amazing, but multi-cursor is an intermediate compromise that solves 99% of my problems much faster.
- The minimap and LSP integration in VSCode feels superior. It doesn't lag as much, and the UX feels more intuitive overall.
- Tab switching, the command palette, and the file tree explorer are more intuitive and feel more thought-out in VSCode.

I understand that there may be plugins that resolve some of the above problems, or potentially a plugin I can write myself, but I am not ready to invest time in order to solve some of the developer experiences that VSCode already solves for me out of the box. It boils down to personal preference and motivation at the end of the day.
- - -

I believe that I barely scratched the surface of what Neovim has to offer, and I am sure I will come back to it every once in a while to learn how the ecosystem has progressed while also learning new things. My opinions on the comparison might even change after a few years, or I might lean into VSCode even further. Time will tell!