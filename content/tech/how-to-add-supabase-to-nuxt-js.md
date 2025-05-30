---
title: How to add Supabase to Nuxt.js
description: This is a quick guide on how you can add Supabase to a Nuxt.js application.
readTime: "3"
author: Saunved
date: 2021-05-02
image: /supabase-to-nuxt.jpg
alt: Rocket launch
tags:
  - tech
  - guide
---

Yesterday, I tried Supabase for the first time. Within about 30 minutes, I had social login and password-based authentication set up. There was almost zero friction during the whole process and I was super impressed, especially after my horrible developer experience with AWS Cognito and Amplify Auth.

This is a quick guide on how you can add Supabase to a Nuxt.js application.

## Prerequisites
1. You have a Nuxt.js application created using *npx create-nuxt-app* or through another method
2. You have created a Supabase project and the Supabase key, Supabase URL

## How to add Supabase to Nuxt

**(1) Install Supabase**
```sh
yarn add @supabase/supabase-js
```

**(2) Add Supabase to plugins**
In the plugins folder
- In a new file, `supabase.client.js`

```js supabase.client.js
import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = '<YOUR-KEY>'
export default ({ app }, inject) => {
  const supabaseUrl = '<YOUR-URL>'
  const supabaseKey = SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  inject('supabase', supabase)
}
```
This will inject Supabase to our Nuxt project, and will be available as *this.$supabase* for us to use

**(3) Add the plugins file to nuxt.config.js**

```js nuxt.config.js
// ...
  plugins: [
    '@/plugins/supabase.client.js'
  ],
// ...
```

You can also use the alternative syntax
```js nuxt.config.js
// ...
  plugins: [
    { src: '@/plugins/supabase.client.js', ssr: false }
  ],
// ...
```
**(4) Use Supabase on any page**
```js home.vue
//...
methods: {
  signIn(){
    const { user, error } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password
      })
      console.log(user, error)
  }
}
//...
```
That's it!

* * *

I'm really excited to see where [@supabase_io](https://dev.to/supabase_io) goes in the coming weeks and months! I hope it keeps growing and adding more useful features.