# be-searching 

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
    "class": "hilite",
    "tag": "span"
}'>
    Supercalifragilisticexpialidocious
</div>
```

generates:

```html
<div be-searching='{
    "forText": "calif",
    "tag": "span",
    "attribs": {
        "class": "hilite"
    },
}'>
    Super<span class=hilite>calif</span>ragilisticexpialidocious
</div>
```

## Example 3 Tied to search input [TODO]

```html
<input type=search value=calif>

<div be-searching='{
    "forValueFrom": "input", 
}>
    Supercalifragilisticexpialidocious
</div>

```

generates:

```html
<div be-searching=calif>
    Super<mark>calif</mark>ragilisticexpialidocious
</div>
```

## Other boolean options:

caseSensitive
regex
wholeWord
beVigilant
recursive

beVigilant will add a mutation observer.






