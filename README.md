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

## Example 3 Tied to search input

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
vigilantly

vigilantly will add a mutation observer.






