class DoublePageBackground extends Paged.Handler {
	constructor(chunker, polisher, caller) {
	  super(chunker, polisher, caller);
	  this.pagedDoublepage;
	  this.sourceSize;
	}
	
	beforeParsed(content) {
	  
	  const doublepages = content.querySelectorAll('[data-double-page]');
      var i = 0;
	  doublepages.forEach( (doublepage) => {
        let breakAfter = getNextSibling(doublepage, function (sibling) {
            return sibling.matches('.break-after');
        });
        var imageClone = document.createElement("img");
        imageClone.src = doublepage.src;
        imageClone.classList.add(doublepage.classList);
        imageClone.classList.add('clone');
        imageClone.dataset.left = doublepage.dataset.left;
        doublepage.dataset.imageOriginal = 'image-' + i;
        imageClone.dataset.imageCloned = 'image-' + i;
        // imageClone.style.left = '0px';
        breakAfter.after(imageClone);
        i++;
	  })
	  
	}
	afterRendered(pages) {
        const doublepages = document.querySelectorAll('[data-double-page]');
        doublepages.forEach( (doublepage) => {
            var dataOriginal = doublepage.dataset.imageOriginal;
            var imageCloned = document.querySelector('[data-image-cloned=' + dataOriginal + ']');
            var posLeft = imageCloned.dataset.left;
            var pageWidth = 21;
            var posLeftCLone = pageWidth-posLeft;
            imageCloned.style.left = -posLeftCLone + 'cm';
        })

	}
  }
  Paged.registerHandlers(DoublePageBackground);

function getNextSibling (elem, callback) {

    // Get the next sibling element
    let sibling = elem.nextElementSibling;

    // If there's no selector, return the first sibling
    if (!callback || typeof callback !== 'function') return sibling;

    // If the sibling matches our test condition, use it
    // If not, jump to the next sibling and continue the loop
    let index = 0;
    while (sibling) {
        if (callback(sibling, index, elem)) return sibling;
        index++;
        sibling = sibling.nextElementSibling;
    }

}
