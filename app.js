function app() {

    function changeContentPortfolio() {
        const urlPortfolioPages = [
            './src/pages/wildlife.html',
            './src/pages/virtual-piano.html',
            './src/pages/photo-filter.html',
            './src/pages/online-zoo.html',
        ];
        const numberPagesPortfolio = urlPortfolioPages.length -1;
        const portfolioTitle = document.querySelector('.portfolio__title');
        const arrowRight = document.querySelector('.arrow-right');
        const arrowLeft = document.querySelector('.arrow-left');
        const externalPage = new XMLHttpRequest();
        let count = 0;

        function getExternalPage() {
            externalPage.open("GET", urlPortfolioPages[count], true);
            externalPage.responseType = "document";
            externalPage.onreadystatechange = function () {
                if (externalPage.readyState != 4) return
                clearTimeout(timeout)
                if (externalPage.status == 200) {
                    let portfolio_page = externalPage.responseXML.querySelector('.portfolio__card');
                    portfolioTitle.after(portfolio_page);
                } else {
                    handleError(externalPage.statusText);
                }
            }
            externalPage.send("a=5&b=4");
            var timeout = setTimeout(function () { externalPage.abort(); handleError("Time over") }, 10000);
            function handleError(message) {
                console.log("Ошибка: " + message);
            }
        }
        
        getExternalPage();
        
        function getNextPage() {
            if (count < numberPagesPortfolio) {
                count++;
                portfolioTitle.nextSibling.remove();
                getExternalPage();
                arrowRight.disabled = true;
            } else {
                count = 0;
                portfolioTitle.nextSibling.remove();
                getExternalPage();
                arrowRight.disabled = true;
            }
        }
        
        arrowRight.addEventListener('click', getNextPage);
        
        function getPreviousPage() {
            if (count > 0) {
                count--;
                portfolioTitle.nextSibling.remove();
                getExternalPage();
                arrowLeft.disabled = true;
            } else {
                count = numberPagesPortfolio;
                portfolioTitle.nextSibling.remove();
                getExternalPage();
                arrowRight.disabled = true;
            }
        } 
        
        arrowLeft.addEventListener('click', getPreviousPage);
    }
    
    
    function scrollMenu() {
        document.querySelectorAll('a[href^="#"').forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                let href = this.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    scrollMenu();

    changeContentPortfolio()
}

app()
