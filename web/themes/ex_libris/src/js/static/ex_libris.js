(function ($, Drupal) {
    Drupal.behaviors.refreshFlags = {
        attach: function( context , settings) {
            $(document).once('freshFlags').ajaxSuccess(function(event, xhr, settings){
                console.log(settings);
                if(settings.url.includes('flag')){
                    $('.view-my-library').trigger('RefreshView');
                    $('.view-recently-from-researcher-you-follow').trigger('RefreshView');
                }
            })
            $(window).once('resizer').resize(setSideBarHeight);
        }    
    }
    
    setSideBarHeight(); 
    setTimeout(setSideBarHeight,400);

    function setSideBarHeight(){
        const block = document.querySelector('.block--full');
        const block_side = document.querySelector('.block--side');
        if(window.innerWidth>=1000){
            let block_height;
            if(block){
                block_height = block.clientHeight;
                block_side.style.minHeight = `${block_height}px`; 
            }
        } 
        else{
            block_side.style.height = 'auto';
        }
    }

    const tabbeds = document.querySelectorAll('.block--tabs');
	if(tabbeds.length>0){
		tabbeds.forEach(tabbed=>{
			const tablist = tabbed?.querySelector('ul');
			const tabs = tablist?.querySelectorAll('a');
			const panels = tabbed?.querySelectorAll('.tab_panel');
			tabs.forEach(tab => { 
				// Handle clicking of tabs for mouse users
				tab.addEventListener('click', e => {
				e.preventDefault();
				let currentTab = tablist.querySelector('[aria-selected]');
				if (e.currentTarget !== currentTab) {
					switchTab(currentTab, e.currentTarget, tabs, panels);
				}
				});
				
				// Handle keydown events for keyboard users
				tab.addEventListener('keydown', e => {
				// Get the index of the current tab in the tabs node list
				let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
				// Work out which key the user is pressing and
				// Calculate the new tab's index where appropriate
				let dir = e.code === 'ArrowLeft' ? index - 1 : e.code === 'ArrowRight' ? index + 1 : e.code === 'ArrowDown' ? 'down' : null;
				if (dir !== null) {
					e.preventDefault();
					// If the down key is pressed, move focus to the open panel,
					// otherwise switch to the adjacent tab
					dir === 'down' ? panels[index].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
				}
				});
			});
		})
	}	
		// The tab switching function
	const switchTab = (oldTab, newTab, tabs, panels) => {
		newTab.focus();
		// Make the active tab focusable by the user (Tab key)
		newTab.removeAttribute('tabindex');
		// Set the selected state
		newTab.setAttribute('aria-selected', 'true');
		oldTab.removeAttribute('aria-selected');
		oldTab.setAttribute('tabindex', '-1');
		// Get the indices of the new and old tabs to find the correct
		// tab panels to show and hide
		let index = Array.prototype.indexOf.call(tabs, newTab);
		let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
		panels[oldIndex].classList.add('hide');
		panels[oldIndex].classList.remove('active');
		panels[index].classList.remove('hide');
		panels[index].classList.add('active');
	}
})(jQuery, Drupal);








