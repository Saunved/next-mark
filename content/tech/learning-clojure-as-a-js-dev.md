---
title: "Learning Clojure as a Javascript developer"
description: "A more or less gentle introduction to Clojure"
author: Saunved
date: 2025-04-02
image: learning-clj-as-js-dev.jpg
credit: Photo by <a href="https://unsplash.com/@vladimir_d?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Volodymyr Dobrovolskyy</a> on <a href="https://unsplash.com/photos/a-cat-sitting-in-front-of-a-computer-monitor-KrYbarbAx5s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
alt: Cat in front of the computer
tags:
    - featured
---

As a JS developer, if you read the word "Clojure", your brain will probably think it's a typo.
Clearly, it's supposed to be "Closure", right?
Right?

## Functional programming
I rarely use `for` loops in JavaScript now. These days, it's all about `map`, `reduce`, `filter`, and the modern, immutable array modifying functions like `toSorted`, and `toSpliced`, which help you avoid the embarrasment and bugs that writing `const topCars = cars.splice(idx, count)` and attempting to use `topCars` somewhere can cause.

Immutability is a gift. It provides stability. It provides certainty in an ever-changing codebase. Immutability reduces variable declarations that could change 400 lines down in a file, like an unexpected (and unwelcome) twist in a story. 

For example, immutability makes this impossible to do:

```js
function buildUserHeadlineProcedural(user){
	let str = ""
	
	if(user.engineer && user.hasDegree) {
	 str += "Bachelor of Engineering"
	}
	
	if(user.isDev) {
	str += `${str.length ? " |" : ""} Software Developer`
	}
	
	if(user.pretentious){
	str += `${str.length ? " |" : ""} Vibe Coder`
	}
	
	str = str.trim();
	
	return str;
}
```

And instead, encourages a pattern like this:

```js
function buildUserHeadlineFunctional(user) {
	return [
		user.engineer && user.hasDegree && "Bachelor of Engineering",
		user.isDev && "Software Developer",
		user.pretentious && "Vibe Coder"
	]
	.filter(Boolean)
	.join(" | ")
	.trim();
}
```

The difference in the two approaches is not subtle at all.
The first approach is (for lack of a better word), icky.

The beauty of JavaScript (if I might call it that), is that is supports multiple ways of thinking.
The first - mutable, procedural way, as well as the second - immutable, functional way, and others too for that matter.

## Why functional programming?
If you are writing in a purely procedural fashion, things can get out of hand pretty quicky. For the most part, you can get away with it, but if you're dealing with a multitude of variables which can change a few hundred lines in, you will end up being confused. 
Not just that, thinking in functions makes it easier for your brain to chunk things.

Look at the `buildUserHeadlineFunctional` again. You can read it almost like a story:
- Add relevant headline items to the array based on the conditions
- Filter out the booleans (we don't want to keep `false`)
- Create a string from the array, with a pipe separator between each entry
- Trim the whitespaces

And you can visualize this easily.

For the procedural example above, you have to keep track of this temporary variable called `str` that mutates conditionally. In a lot of cases, procedural programming can feel like you're micro-managing the code, telling it exactly how to do something, rather than what to do.

## Enter Clojure
Clojure is a functional programming language.

If you have never read Clojure code before, the syntax will throw you off.
In this article, I want to help you get a basic understanding of this by showing you how to read Clojure code.

```clojure
(+ 1 2 3 4)
```

Everything between two round braces is called a list, known as a form or expression in Clojure. If you want to learn more about this syntax, the [ClojureScript docs](https://www.learn-clojurescript.com/section-0/lesson-4-expressions-and-evaluation/) do a great job of explaining it.
The first item in the expression is a function. So in the code above, `+` is a function. You can read it as `add`.

So the code above says, `add 1 2 3 4`.

How about division?

```clojure
(/ 8 4)
```

In cases where the order of operands matters, such as division and subtraction, it helps to think of the operands in pairs.
So you'd read the above as "divide 8 by 4".

How about multiple operands?

```clojure
(/ 8 4 2 4)
```

Since division always works with two operands, you can read it this way:
`divide 8 by 4, then by 2, then, by 4`, which gives us `0.25`.

You can nest functions inside functions, and you will always read them in to out.
For example:

```clojure
(+ 5 (* 7 (+ 5 3)))
```
The innermost function is `(+ 5 3)`, which evaluates to 8.
That is, then multiplied with 7, which is the nearest, leftmost function, to give 56, and that is then added to 5, to give 61.
Always, in to out.

![Tree diagram showing order of evaluation](tree_diag_expr.jpg)

This can quickly get messy, and there are clever ways to prevent deep nesting like this. We'll study that in a bit.

## Clojure code that will make you uncomfortable

How about we try to understand the same code as above, but this time in Clojure?

```clojure
(defn build-user-headline
  [{:keys [engineer has-degree is-dev pretentious]}]
  (->> [(when (and engineer has-degree) "Bachelor of Engineering")
        (when is-dev "Software Developer")
        (when pretentious "Vibe coder")]
       (remove nil?)
       (cs/join " | "))) ;; cs is an import of clojure.string
```

Okay, yes. I know.
It's weird, it feels off, and you hate it because what in the mumbo jumbo is going on here?
Let's try to understand it, one line at a time.

`(defn build-user-headline`
^ Define a function (def fn -> defn) called `build-user-headline`

`[{:keys [engineer has-degree is-dev pretentious]}]`
Function arguments are written inside square brackets, like an array.

So this function:
```clojure
(defn get-full-name
[first last]
(str first " " last))
```
takes two arguments, first and last, and returns the full name. 

You might have noticed that there is no `return` keyword.
Clojure functions don't have an explicit return. The last expression executed in a function is its return value.

Functions can also take maps as arguments.
```clojure
(defn get-full-name
[user] ;; {:first "some name" :last "some name"}
(str (:first user) " " (:last user)))
```
Takes a user object, and returns the full name.
`:first` and `last` are keywords, as opposed to strings, which are typically used in JS.
A special property that keywords have, is they are also functions.
So `(:first user)`, is the same as saying give me the value of the key called `:first` in the object `user`. It's a shorthand syntax, the closest analogy to this in JS is the dot notation.

What if you want to access specific object properties and use them instead of destructuring them later?
```clojure
(defn get-full-name
[{:keys [first last]}]
(str first " " last))
```

This is just a destructuring syntax but at the function argument level. There are other similar syntaxes, but for now, this should help you understand the function.

The arguments coming in should look something like this:
```clojure
;; Def means "define", similar to a "let" in JS
(def user {:has-degree false,
 :pretentious true, 
 :is-dev true, 
 :engineer false
})

(build-user-headline user)

```

For your JS eyes, I have kept the comma, but commas in Clojure are essentially whitespace. I could write it this way:
```clojure
{:has-degree false
 :pretentious true 
 :is-dev true
 :engineer false
}
```
^ This is how most people would write it.

Or this way:
```clojure
{:has-degree false,
 :pretentious true,
 :is-dev true,,,,,,
 :engineer false,,,
}
```
^ To mess with people. It doesn't matter.

So, this function will accept one argument, which is a map containing the keywords specified.

At the start of the next line, we have this symbol: `->>`. No, it's not a typo.
Remember when I said anything at the start of an expression is a function?
That... was a lie. It can also be a macro.
`->>` is a macro, also known as a thread-last macro.

Now, I tripped up on this for ages, and I want to help you avoid it.
`->` this is the thread first macro
`->>` this is thread last macro.
And both of them have NOTHING to do with multi-threading. Absolutely nothing.

For the purposes of understanding, you can think of a macro as a function.

The thread first macro, *weaves* the return value of the previous expression into the *first* argument of the current function. 
The thread last macro, *weaves* the return value of the previous expression into the *last* argument of the current function.
The first argument to a threaded macro, is the data on which the other function calls will operate.

I know you're confused, so let's understand with an example.

```clojure
(->> [1 2 3 4 5]
     (filter even?)
     (map #(* % 2)))
```

The first argument after the threaded macro is a vector. This is what will be *operated upon* and "weaved through". The next line is a function called filter, which accepts a function called `even?` as its argument. Since we're using the thread-last macro, the vector is automatically inserted after `even?`, so you can imagine it to be like this: `(filter even? [1 2 3 4 5])`.
And the second line is a `map` function, which accepts an anonymous function which multiplies each item in the vector by 2.

This is an awful lot like **method chaining** in JS:

```js
[1, 2, 3, 4, 5]
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
```

Besides helping you avoid the repetition that would come from having to insert the map everywhere, it also helps you avoid a problem I highlighted above, viz. deep nesting.

Without this macro, we would have something like this:
```clojure
(map #(* % 2) (filter even? [1 2 3 4 5]))
```
No thank you!

The *thread-first* macro also operates similarly, but instead of injecting the argument in the last position, it will inject it at the first position. This is usually helpful when you are working with maps, as opposed to vectors, since a lot of functions that operate on maps take them as their first argument.

Coming back to the original code, let's take the entire vector (array) instead of just the first item:

```clojure
  (->> [(when (and engineer has-degree) "Bachelor of Engineering")
        (when is-dev "Software Developer")
        (when pretentious "Vibe coder")])
```

We can see now that the data to be operated upon is an array, but each item in the array itself is an expression.
So, if code is nested, we read it inside to outside.
The innermost function I can see is the `and` function. If `engineer` and `has-degree` both are true, this will evaluate to true.
Then, immediately to the left, we have `when`. 
If the condition to when is `true`, then when returns the 2nd argument, viz. in this case "Bachelor of Engineering", otherwise, it implicitly returns `nil` (`nil` is sort of like `null`).
And since we're operating inside a vector, each of these expressions will evaluate, and the vector will be created.

It might look something like this:
`["Bachelor of Engineering", nil, "Vibe Coder"]`

Then we have the next line:
`(remove nil?)`

Since it is part of a thread-last macro, you would read it like this:
`(remove nil? <vector>)`
or, remove all nil values from the vector.
So it should look like this now:
`["Bachelor of Engineering", "Vibe Coder"]`
In clojure `?` are allowed in function names, and functions which have this, should ideally return boolean values.

Then, the last line:
`(cs/join " | ")`
Or:
`(cs/join " | " <vector>)`

Join the items in the vector with the pipe separator.
`"Bachelor of Engineering | Vibe Coder"`

Look at the code again and see if things are clearer:
```clojure
(defn build-user-headline
  [{:keys [engineer has-degree is-dev pretentious]}]
  (->> [(when (and engineer has-degree) "Bachelor of Engineering")
        (when is-dev "Software Developer")
        (when pretentious "Vibe coder")]
       (remove nil?) 
       (cs/join " | ")))
```


This article was intended to help you dip your toes into the world of Clojure, and highlight some concepts you might run into and struggle with when you look at Clojure code.

My intention with writing this article is to bring a JS perspective to understanding Clojure. If you are a Clojure dev and have feedback, please let me know, always happy to learn.

There is a lot more to learn, especially when it comes to editing Clojure code (moving parentheses around), importing modules, writing unit tests, and setting up a debugger. I will try to center my next article around this.

## Resources

These are the key resources that have helped me learn Clojure:

- This article helped me understand the meaning behind a lot of weird characters or symbols in Clojure: https://clojure.org/guides/weird_characters. You can explore the entire website while you're at it, it's a good reference.
- Calva is the extension of choice if you are a VSCode user, you can learn how to set up Calva here: https://calva.io/getting-started/. I recommend watching the video on that page so you can understand how Clojure devs typically code.
- If you want to solve some basic Clojure challenges, you can try 4Clojure, here: https://4clojure.oxal.org. I wouldn't suggest spending too long on this, try creating a project and struggle through it instead.
- Finally Clojure Docs: https://clojuredocs.org are a great place for all the other resources or references you might need.

It also helps if you can find an open-source Clojure repo and set it up locally so you learn how to work with an existing project. 

---
*Thanks  [@mihir](https://mihirdeshpande.com) for reviewing this article.* He also suggested this reference as a great read: [Why Clojure?](https://gaiwan.co/blog/why-clojure)