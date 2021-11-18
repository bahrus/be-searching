# be-searching [TODO]

## Example 1 -- minimal

```html
<div be-searching=calif>
    Supercalifragilisticexpialidocious
</div>
```

generates:

```html
<div be-searching=calif>
    Super<mark>calif</mark>ragilisticexpialidocious
</div>
```

## Example 2 -- custom class, tag

```html
<div be-searching='{
    "for": "calif",
    "class": "hilite",
    "tag": "span"
}'>
    Supercalifragilisticexpialidocious
</div>
```

generates:

```html
<div be-searching='{
    "for": "calif",
    "class": "hilite"
}'>
    Super<span class=hilite>calif</span>ragilisticexpialidocious
</div>
```

Tied to search input

Other options:

caseSensitive
regex
wholeWord






