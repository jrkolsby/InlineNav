# JQuery Inline Nav

A small plugin for an SEO-friendly navigation based on unordered lists.

<img src="https://cdn.dribbble.com/users/183975/screenshots/3852634/untitled-1.gif" alt="Demo on Dribbble" width="400" height="300">

## Usage

HTML:
```
<nav class="mynav">
<ul class="is-root">
    <li>Products</li>
    <li>Services
        <ul>
            <li>Design</li>
            <li>Development</li>
        </ul>
    </li>
    <li>Blog
        <ul>
            <li>June</li>
            <li>July</li>
            <li>Archives</li>
        </ul>
    </li>
</ul>
</nav>
```

Javascript:
```
$('nav.mynav').inlineNav();
```
