const navigation = () => {
document.addEventListener("DOMContentLoaded", function () {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  var hamburger = document.querySelector(".hamburger");
  var menuopen = document.querySelector(".menu--main");
  var menuAccOpen = document.querySelector(".menu--account");
  var header = document.querySelector("#header");
  var jumpFix = document.getElementById("sticky-header-jump-fix");
  var lastScrollTop = 0;
  if (scrollHeight > 1400) {
    window.addEventListener("scroll", function () {
      var scrollTops = window.pageYOffset;
      if (scrollTops > 250 && scrollTops <= 800) {
        header.classList.add("slideOut");
        header.classList.remove("slideIn", "slideInDown");
        jumpFix.style.height = `${header.offsetHeight}px`;
        setTimeout(() => {
          header.classList.remove("posFixed");
        }, 1000);
      } else if (scrollTops > 800 && lastScrollTop > scrollTops) {
        header.classList.add("slideOut", "posFixed", "slideInDown");
        jumpFix.style.height = `${header.offsetHeight - 4}px`;
      } else if (scrollTops > 800 && lastScrollTop < scrollTops) {
        header.classList.remove("slideInDown");
      } else {
        header.classList.remove("slideInDown", "slideOut", "posFixed");
        jumpFix.style.height = `0`;
      }
      lastScrollTop = scrollTops;
    });
  }
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
    menuopen.classList.toggle("open");
    menuAccOpen.classList.toggle("open");
    header.classList.toggle("menu_is_open");
  });

  const searchToggle = document.querySelector('#toggle_search');
  searchToggle.addEventListener('click',(e)=>{
    e.preventDefault();
    header.classList.toggle('open_search');
    if ( e.currentTarget.getAttribute( 'aria-expanded' ) === 'true' ) {
			e.currentTarget.setAttribute( 'aria-expanded', 'false' );
		} else {
			e.currentTarget.setAttribute( 'aria-expanded', 'true' );
		}
  })
});

}

export default navigation;