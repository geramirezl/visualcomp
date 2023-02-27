---
title: Juan Sierra
type: docs
---

# Juan Guillermo Sierra Agreda
## Hola

Welcome to the [gohugo](https://gohugo.io/) template to create rich content [academic reports](https://www.wordy.com/writers-workshop/writing-an-academic-report/) having [p5.js](https://p5js.org/) sketches.

## Quien Soy

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/VisualComputing/showcase
$cd showcase
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `$git push` after redefined `baseURL` in `config.toml` which should point to your actual public remote.

{{< hint warning >}}
**Don't rename the repo but leave it as 'showcase'**  
even so if you decided to rename the repo anyways, say to `newreponame`, don't forget to update all url references of the markdown and js file sources, to reflect that change, i.e., look within all [content folder](https://github.com/VisualComputing/showcase/tree/main/content) files for `showcase` occurrences and replace them by `newreponame`, which btw should easily be doable in any recent open source code editor, e.g., 🔎 in [kate](https://kate-editor.org/) or [vs-codium](https://vscodium.com/).
{{< /hint >}}

## Ilusion visual

{{< p5-iframe sketch="/visualcomp/sketches/colors.js" width="725" height="425" >}}