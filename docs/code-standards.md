# Code Standards

## Table of Contents
- [Language-Independent Standards](#lang-independent)
- [HTML](#html)
    - [Indentation](#html-indentation)
    - [Multi-line Attributes](#html-attributes)
    - [Semantic Elements](#html-semantic)
    - [Miscellaneous Rules](#html-misc-rules)
- [CSS/SCSS](#s-css)
    - [Indentation](#s-css-indentation)
    - [Naming](#s-css-naming)
- [JavaScript & TypeScript](#jsts)
    - [Indentation](#jsts-indentation)
    - [Alisaing](#jsts-aliasing)
    - [Naming](#jsts-naming)
    - [Import Ordering](#jsts-import-ordering)
    - [ESLint](#jsts-eslint)
    - [Miscellaneous Rules](#jsts-misc-rules)
    - [React](#jsts-react)
        - [Folder Structure](#jsts-react-folder-structure)
            - [Components](#jsts-react-folder-structure-components)
        - [Hooks](#jsts-react-hook)


## Language-Indepdendent Standards <a name="lang-independent"></a>

### Imports
Unless otherwise stated, all imports should use absolute project paths and be ordered alphabetically. [a-zA-z] take precedence over special characters such as [/@].

If importing system libraries and third-party libraries as well as self-defined files, these should be in separate blocks. For example, in JavaScript:

```js
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Button from '@/components/Button';
```

## HTML/JSX/XML <a name="html"></a>

### Indentation <a name="html-indentation"></a>
Indetation will be 4 spaces.

### Multi-line Attributes <a name="html-attributes"></a>
If the number of attributes exceed 2, each attribute should be separated onto their own line for readability.

Note that each attribute is indented. Its closing `>` is not indented.

```html
<div id="card" class="card">
    Some content
</div>

<div
    id="myId"
    class="block"
    data-attribute="someValue"
    data-attributeTwo="anotherValue"
>
    Some more content
</div>
```

### Semantic Elements <a name="html-semantic"></a>
For a deeper dive, visit this [article](https://www.freecodecamp.org/news/semantic-html5-elements/).

HTML5 added a number of semantic HTML elements to more describe the purpose of a document and the type of content that is inside them. These are:

```html
<article></article>             <!-- Acts like a <div> element -->
<aside></aside>                 <!-- Acts like a <div> element -->
<details></details>
<figcaption></figcaption>
<figure></figure>
<footer></footer>               <!-- Acts like a <div> element -->
<header></header>               <!-- Acts like a <div> element -->
<main></main>
<mark></mark>
<nav></nav>                     <!-- Acts like a <div> element -->
<section></section>             <!-- Acts like a <div> element -->
<summary></summary>
<time></time>
```

Here's an example of HTML code using semantic elements:
```html
<header>My Header</header>
<section>
    <article>
        <figure>
            <img src="" alt="My image">
            <figcaption>My caption</figcaption>
        </figure>
    </article>
</section>
<footer>My Footer</footer>
```

Semantic element should be used wherever possible for the following reasons:
- Code is easier to read
    - If the code above was written using only `<div>`, it wouldn't be as clear, even with appropriate class names.
- Greater accessibility for users
    - Search engines and assistive technologies (like screen readers) can better understand the context of the website.
- Code consistency
    - When using `<div>`, it might be given different class names like `"header"` or `"head"`. If we just used a `<header>` element, it takes away some ambiguity.

### Miscellaneous Rules <a name="html-misc-rules"></a>
- Double quotes everywhere possible

## CSS/SCSS <a name="s-css"></a>

### Indentation <a name="s-css-indentation"></a>
Indetation will be 4 spaces to follow common CSS standards.

### Naming <a name="s-css-naming"></a>
Naming CSS classes should follow the [BEM standard](https://getbem.com/naming/).
- **Block**: A standalone entity that is meaningful on its own.
- **Element**: Multiple elements compose a block. Elements have no standalone meaning. They are semantically tied to the block.
- **Modifier**: Flags or blocks on elements. Used to change appearance, behavior, or state

There is also a "Mix", which is an entity that is both a Block and an Element at the same time.

```html
<style>
/* .card is a Block element */
.card {
    padding: 0.4em 0.8em;
    background-color: pink;
    border: 1px solid pink;
    border-radius: 1.5em;
    outline: none;
}
/* `--selected` acts as a Modifier to change the appearance of .card */
.card--selected {
    background-color: gray;
    border-color: red;
}

/* .card__header is an Element. It is part of .card, but means nothing by itself */
.card__header {
    font-size: 2.5rem;
}

.button {
    outline: none;
    padding: 0.4em 0.8em;
    border: 1px solid #000;
    border-radius: 5px;
}

/* .card__button is a Mix. It is a standalone Block, but is an element of .card
    It takes styles from .button and appends its own styles over it.
*/
.card__button {
    margin-right: 1em;
}
/* We're adding modifier styles to the Mix */
.card__button--primary {
    background-color: red;
    border-color: red;
    color: #fff;
}
</style>

<div class="card card--selected">
    <h3 className="card__header"></h3>
    <img class="card__image">

    <button class="button card__button card__button--primary">
        Primary
    </button>
</div>
```


## JavaScript & TypeScript <a name="jsts"></a>

### Indentation <a name="jsts-indentation"></a>
Indentation will be 2 spaces.

### Naming <a name="jsts-naming"></a>
- Variables: `camelCase`
- Global Constants: `UPPERCASE_SNAKE_CASE`
- Functions: `camelCase`
- Classes: `PascalCase`
- Enums: `PascalCase`
    - Enum Values: `UPPERCASE_SNAKE_CASE`
- API Response Properties: `snake_case`
- Vanilla File Names: `kebab-case`

### Aliasing <a name="jsts-aliasing"></a>
When possible, aliasing should be used to make imports nicer. These will be defined in `tsconfig.json` and in another configuration file depending on the module bundler being used.

```json5
// tsconfig.json
{
    "paths": {
      "@/*": ["./src/*"],
      "@mocks/*": ["./__mocks__/*"],
      "@tests/*": ["./__tests__/*"]
    }
}
```

### Import Ordering <a name="jsts-import-ordering"></a>
In general, pre-defined packages and modules should be imported first. Then self-defined modules should be listed.

For self-defined modules, they should be grouped by directory first, then in alphabetical order. Modules that are higher up in the project tree take precedence.

CSS style files are imported last in the same fashion as self-defined modules.

There should be a one new line between each block of imports.

```ts
import axios from 'axios';
import throttle from 'lodash.throttle';
import {useCallback, useState} from 'react';

import MockTheme from '@mocks/MockTheme';
import Button from '@/components/Button';
// importing a component and components living in the same directory
import Home from '@/pages/Home';
import About from '@/pages/Home/About';
import Hero from '@/pages/Home/Hero';
// Continue ordering
import Sidebar from '@/partials/Sidebar';

import './index.css';
```

### ESLint <a name="jsts-eslint"></a>
The configuration in `.eslintrc.json` should be used and unchanged.

### Miscellaneous Rules <a name="jsts-misc-rules"></a>
- Single quotes everywhere, except in JSX
- Double quotes in JSX
- Use of semicolons
- Use trailing commas

### React <a name="jsts-react"></a>

#### Naming <a name="jsts-react-naming"></a>
- Components: `PascalCase`
- Hooks: `camelCase` and must start with `use`. (Ex. `useBreakpoints`)

### Folder Structure <a name="jsts-react-folder-structure"></a>

#### Components <a name="jsts-react-folder-structure-components"></a>
In general, React components that are able to be composed in only a ***single*** file should stay in a single file.

If the component needs another file, such as a `.css` file or is composed of other components, all files that make up this component should live in the same folder. The folder will be named after the main component, and the main component will be defined in `index.tsx`. This allows the main component to be imported like:
```ts
import PageScroller from '@/components/PageScroller';

// Rather than this
import PageScroller from '@/components/PageScroller/PageScroller';
```

```
root/
    |__ __mocks__/
    |__ __tests__/
    |__ docs/
    |__ node_modules/
    |__ src/
        |__ api/
        |__ components/
            |__ Button.tsx
            |__ ColorThemeToggle.tsx
            |__ PageScroller/
                |__ index.css
                |__ index.tsx
        |__ core/
            |__ context/
            |__ enums/
            |__ theme/
            |__ types/
        |__ hooks/
            |__ useBreakpoints.ts
        |__ pages/
            |__ 404.tsx
            |__ Dashboard/
            |__ Home/
                |__ index.css
                |__ index.tsx
                |__ About.tsx
                |__ Hero.tsx
            |__ Projects/
        |__ partials/
            |__ Navigation/
                |__ index.css
                |__ index.tsx
                |__ NavLink.tsx
    |__ .eslintrc.json
    |__ .prettierrc.json
    |__ package.json
    |__ tsconfig.json
```

#### Hooks <a name="jsts-react-hooks"></a>
Hooks should only be called at the top level of a React function before any early returns. This ensures that hooks are called in the same order each time a component renders.

In addition, only call Hooks from React function components or custom Hooks.

For more, see the React docs for [rules of hooks](https://reactjs.org/docs/hook-rules.html).
