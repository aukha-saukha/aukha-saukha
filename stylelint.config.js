// Copyright (c) 2026 Aukha Saukha and its affiliates.
// SPDX-License-Identifier: MIT

export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  plugins: ['stylelint-order'],
  rules: {
    // Disallow vendor prefixes for @-rules (e.g., @-webkit-keyframes)
    'at-rule-no-vendor-prefix': true,

    // Forbid named colors (e.g., 'red', 'blue') to enforce design system variables
    'color-named': 'never',

    // Keep custom properties aligned with kebab-case
    'custom-property-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',

    // Disallow !important to prevent specificity issues
    'declaration-no-important': true,

    // Restrict units to enforce design system consistency
    'declaration-property-unit-allowed-list': {
      '/^animation-delay/': ['ms', 's'],
      '/^animation-duration/': ['ms', 's'],
      'border-radius': ['%', 'px', 'rem'],
      '/^border.*width/': ['px'],
      'flex-basis': ['%', 'px', 'rem'],
      'font-size': ['rem', 'vw'],
      gap: ['px', 'rem'],
      'grid-template-columns': ['%', 'fr', 'px', 'rem'],
      'grid-template-rows': ['%', 'fr', 'px', 'rem'],
      height: ['%', 'dvh', 'lvh', 'px', 'rem', 'svh', 'vh'],
      // Empty array forces unit-less numbers
      'line-height': [],
      margin: ['%', 'rem'],
      'max-width': ['%', 'dvw', 'rem', 'vw'],
      padding: ['%', 'px', 'rem'],
      'transition-duration': ['ms', 's'],
      width: ['%', 'dvw', 'px', 'rem', 'vw'],
    },

    // Forbid legacy layout methods
    'declaration-property-value-disallowed-list': {
      display: ['inline-block', 'table'],
      float: ['left', 'right'],
    },

    // Keep keyframes aligned with kebab-case
    'keyframes-name-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',

    // Limit nesting depth to 3 levels
    'max-nesting-depth': [
      3,
      {
        // Exempts pseudo-classes e.g., :hover
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['container', 'layer', 'media', 'supports'],
        // Ignore depth calc for pseudo-elements ::before/::after selectors (e.g., &::before)
        ignoreRules: [/::(after|before)$/],
      },
    ],

    // Enforce alphabetical order for properties
    'order/properties-alphabetical-order': true,

    // Disallow vendor prefixes for properties (e.g., -webkit-transform)
    'property-no-vendor-prefix': true,

    // Ensure SASS @if/@else/@while statements don't use unnecessary parentheses
    'scss/at-rule-conditional-no-parentheses': true,

    // Replace the core `at-rule-no-unknown` with the SCSS-aware version so that
    // Sass-specific at-rules (@mixin, @include, @if, @each, …) are not flagged.
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,

    // Disallow @use ... as * to avoid global namespace pollution
    'scss/at-use-no-unnamespaced': true,

    // Enforce a blank line before Sass variables for readability, except after comments or at the
    // start of a block, and allow grouping consecutive variables without extra spacing.
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'first-nested'],
        ignore: ['after-dollar-variable'],
      },
    ],

    // Disallow leading underscore in partial names in @import, @use, @forward etc.
    'scss/load-no-partial-leading-underscore': true,

    // Disallow file extensions in @import, @use, @forward etc.
    'scss/load-partial-extension': 'never',

    // Prevent duplicate mixin names to avoid silent overrides and hard-to-track bugs
    'scss/no-duplicate-mixins': true,

    // Disallow deprecated global Sass function names e.g., lighten(), darken()
    // Use the sass:color module equivalents instead.
    'scss/no-global-function-names': true,

    // Enforce kebab-case naming for %placeholders
    'scss/percent-placeholder-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',

    // Enforce kebab-case for classes, including nested selectors in Sass
    // Keep the core rule `selector-class-pattern` explicitly disabled; scss/selector-class-pattern
    // supersedes it for SCSS files.
    'selector-class-pattern': null,
    'scss/selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        resolveNestedSelectors: true,
      },
    ],

    // Disallow redundant nesting selectors (&)
    // i.e., ensure `& .child` doesn't get used when .child would suffice
    'scss/selector-no-redundant-nesting-selector': true,

    // Limit the number of compound selectors within a single complex selector to a maximum of 4
    'selector-max-compound-selectors': 4,

    // Prevent IDs for styling
    'selector-max-id': 0,

    // Limit universal selectors (*) to prevent unintentional global styles
    'selector-max-universal': 1,

    // Prevent unnecessary type qualifiers (e.g. `div.class` → `.class`).
    // Attribute selectors are exempted (e.g. `input[type='text']`).
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'],
      },
    ],

    // Disallow vendor prefixes for selectors (e.g., ::-webkit-input-placeholder)
    'selector-no-vendor-prefix': true,

    // Allow CSS Modules :export and :import
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'import'],
      },
    ],

    // Disallow poorly supported or print-oriented units
    'unit-disallowed-list': ['ch', 'cm', 'ex', 'in', 'mm', 'mozmm', 'pc', 'pt'],

    // Disallow vendor prefixes for values (e.g., -webkit-linear-gradient)
    'value-no-vendor-prefix': true,
  },
};
