# be-searching 

Make a DOM element searchable.

[![Playwright Tests](https://github.com/bahrus/be-searching/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-searching/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-searching.png)](http://badge.fury.io/js/be-searching)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-searching?style=for-the-badge)](https://bundlephobia.com/result?p=be-searching)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-searching?compression=gzip">

## Example 1 -- minimal

```html
<div be-searching=calif>
    Supercalifragilisticexpialidocious
</div>
```

generates:

```html
<div be-searching=calif>
    Super<mark data-from=be-searching>calif</mark>ragilisticexpialidocious
</div>
```

## Example 2 -- custom class, tag

```html
<div be-searching='{
    "forText": "calif",
    "attribs":{
        "class": "hilite"
    },
    "tag": "span"
}'>
    Supercalifragilisticexpialidocious
</div>
```

generates:

```html
<div be-searching='{
    "forText": "calif",
    "attribs": {
        "class": "hilite"
    },
    "tag": "span"
}'>
    Super<span class=hilite>calif</span>ragilisticexpialidocious
</div>
```

## JSON-in-html?

Editing JSON-in-html can be rather error prone.  A [VS Code extension](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) is available to help with that, and is compatible with web versions of VSCode.

## Example 3 Tied to search input

Use be-searching in partnership with [be-linked](https://github.com/bahrus/be-linked).

```html
    <input type=search>
    
    <div 
        be-linked='
        On input event of previous element sibling pass value property to $0-enh-by-be-searching => for text.
    '>
    <div>
        supercalifragilisticexpialidocious
    </div>

```

generates:

```html
<div is-searching='{
    "forValueFrom": {
        "observe": "input",
    }
}>
    Super<mark>calif</mark>ragilisticexpialidocious
</div>
```

## Other boolean options: 

caseSensitive
regex [TODO]
wholeWord [TODO]
beVigilant [TODO]
recursive [TODO]

beVigilant will add a mutation observer.

## Running locally

1.  Do a git clone or a git fork of repository https://github.com/bahrus/be-searching
2.  Install node.js
3.  Run "npm install" from location of folder created in step 1.
4.  Run npm run serve.  Open browser to http://localhost:3030/demo/

## Using from ESM Module:

```JavaScript
import 'be-searching/be-searching.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-searching';
</script>
```






