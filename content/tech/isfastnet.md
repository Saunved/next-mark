---
title: "isfastnet: a tiny script to find out if your user's internet is fast or slow"
description: "Determining if your user has fast or slow internet at runtime"
canonical: https://dev.to/saunved/isfastnet-a-tiny-script-to-find-out-if-your-user-s-internet-is-fast-or-slow-4h84
author: Saunved
date: 2022-11-15
image: odometer.jpg
credit: Photo by <a href="https://unsplash.com/@markcjn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mark Chan</a> on <a href="https://unsplash.com/photos/black-vehicle-instrument-cluster-panel-rOtztBq2PM4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
alt: Car odometer
---
As web developers, we usually write code on systems with good internet speeds. The bulk of our time is spent with the subconscious assumption that "other people should have similar speeds".

Many browsers offer network throttling to test how your application will perform on slower network speeds and we do test for these, but we don't particularly worry about it unless our use case calls for it.

We are working on a food delivery webapp at my company, and being located in India, with some of the most unreliable cellular data, this is a HUGE problem for us. When we run the application on our devices, things work just fine. But on devices with 3G, and devices with poor connectivity, things get a lot worse. Network calls take more than 5s to complete, and that's a massive nightmare for any user.

So we had a use case. Optimizing for poor internet speeds. The first part of the problem is - can we detect if a user's internet is slow and show them some sort of a message / reduce network calls if that is the case?

Below, I outline two solutions, and finally a tiny package I made using one of the solutions.

You can check out the demo page [here](https://saunved.github.io/isfastnet) and if you want to test it out, you can download the package directly from npm and start using it:  [npm link](https://www.npmjs.com/package/isfastnet)

### The Network Information API
Easily the best and most useful solution. An API that can tell you exactly how good your user's internet speed is. The problem?

![Network Information API CanIUse](network-info-api.png)

Partial support on Chromium browsers and no support on Safari and Firefox.

### Client-side solutions
As any sane developer would do, I looked up the problem on Stack Overflow. This is one of the most popular questions on the topic: [Stack Overflow post](https://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript)

The most upvoted and "marked as correct" answer suggests downloading a large image and checking the total time it takes, and dividing the size of the image by the time taken to determine speed. That does answer the question correctly - but in a real system, it might not be the most pragmatic approach.

> If a user's internet is already slow, do you really want to download a large image to check _how slow_ it really is?

The larger problem at hand is that you cannot periodically check if the user's internet is slow because it will hog bandwidth for already slow networks.

> In most cases, we just want to know if our user's internet is fast or slow.

A little below on the same question, you can find [this answer](https://stackoverflow.com/a/21372151/6513036). It suggests downloading a very tiny image multiple times, generating the average download speed, and determining if the internet is fast or slow.

Now we're talking!

Basically, we can set a "threshold" value. If the image is taking (on average) longer than "threshold" milliseconds to download, then the internet must be slow. Sounds great, and it doesn't hog bandwidth either.

However, if you test this out in Chrome DevTools, you will see that this test takes more than 10 seconds to end on slow networks. That's too much waiting to find out if the internet is actually slow.

To get past this issue, one can write a setTimeout inside the recursive function. This setTimeout should force exit the function if the image wasn't downloaded in **threshold*3** ms. The 3 is arbitrary, but it should work for most cases. So I edited the script to make those changes.

You can test out how the script works by copy-pasting this and running it with throttling turned on.

```html
<script src="https://cdn.jsdelivr.net/npm/isfastnet"></script>
<script>
isFastNet((value) => {
    if(value){
         console.log("Internet is fast")
    }
    else{
         console.log("Internet is slow")
    }
}, { 
timesToTest: 5, // optional, number of times to load the image, default is 5
threshold: 200, // optional, threshold in ms after which internet speed is considered slow
image:  "http://www.google.com/images/phd/px.gif", //  optional, url of the tiny image to load
allowEarlyExit: true // optional, if the first request takes greater than threshold*3 ms then the function exits with false
})
</script>
```


![Fast internet on WiFi](fast-internet-on-wifi.png)
Figure: Fast internet on WiFi


![Shows slow internet on throttling](slow-internet-throttling.png)
Figure: Slow internet on throttling

The project is open source and I am looking for contributors. Feel free to open issues or fork the project!
[Github](https://github.com/Saunved/isfastnet) / [npm link](https://www.npmjs.com/package/isfastnet)

And do leave a "star" if this helps you :)
The stars have no real value, but they make me happy!