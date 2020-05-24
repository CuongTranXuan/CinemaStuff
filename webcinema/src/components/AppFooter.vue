<template>
  <div class="footer">
    <ul>
      <li>&#10004; Created with Vue.js</li>
      <li>
        &copy;
        <a>changed</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  margin: 0 auto;
  padding: 4em 0;
  text-align: center;
  font-size: 0.9em;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0
}
li {
  display: block;
  padding: 1em;
}
a {
  color: $color-text-primary;
  text-decoration: dotted underline;
  &:hover {
    color: $color-text-secondary;
    background-color: $color-primary;
    text-decoration: none;
  }
}
@include sm {
  .footer{
    max-width: 1000px;
  }
  ul{
    display: flex;
  }
  li {
    display: inline;
    padding-right: 2em;
    text-align: left;

    &:last-child{
      flex-grow: 1;
      padding-right: 1em;
      text-align: right;
    }
  }
}
</style>