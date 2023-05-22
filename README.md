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
<div is-searching=calif>
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
<div is-searching='{
    "forText": "calif",
    "attribs": {
        "class": "hilite"
    },
    "tag": "span"
}'>
    Super<span class=hilite>calif</span>ragilisticexpialidocious
</div>
```

```html
<input type=search value=calif>

...
<div be-searching
be-linked='
    On input event of previous input element pass value property to for text property of be-searching enhancement of adorned element.
'
>
</div>
```


## Example 3 Tied to search input

```html
<input type=search value=calif>

<div be-searching='{
    "forValueFrom": {
        "observe": "input",
    }
}>
    Supercalifragilisticexpialidocious
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






