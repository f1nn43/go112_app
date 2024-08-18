const navBtn = document.querySelector('.header__navbarlow')
const nav = document.querySelector('.header__blockdowner')
navBtn.addEventListener('click', () => {
    nav.classList.toggle('active')
})

const catalogCards = document.querySelectorAll('.catalog__card');
catalogCards.forEach((card) => {
    let catalogOption = card.children[1].querySelector('.catalog__cardbtns').querySelectorAll('.catalog__option')
    let tabs = card.children[1].querySelectorAll('.catalog__cardp');
    tabs[0].classList.add('active')
    catalogOption[0].classList.add('active')
    catalogOption.forEach((el) => {
        el.addEventListener('click', (ev) => {
            catalogOption.forEach((e) => {
                e.classList.remove('active')
            })
            el.classList.add('active');

            let tab = card.children[1].querySelectorAll('#' + ev.target.id + '')[0];
            tabs.forEach((es) => {
                es.classList.remove('active');
            })
            tab.classList.add('active')
            let val = card.children[1].querySelector('.value');
                val.value = ev.target.id.replace('option', '')
            
        })
    })
})

const $basket = document.querySelector('#basket')
if ($basket) {
    $basket.addEventListener('click', event => {
        if (event.target.classList.contains('basket__deletebtn')){
            const id = event.target.dataset.id

            fetch('/basket/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(basket => {
                if(basket.cards.length) {
                    const html = basket.cards.map(c => {
                        return `
                        <tr>
                            <td>${c.cardTitle}</td>
                            <td>${c.tierNumber}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="basket__deletebtn" data-id="${c.id}">Удалить</button>
                            </td>
                        </tr>
                        `
                    }).join('')
                    $basket.querySelector('tbody').innerHTML = html
                } else {
                    $basket.innerHTML = '<p>Нет добавленного товара</p>'
                }
            })
            .catch(err => console.log('something went wrong, error was', err));
        }
    })
}