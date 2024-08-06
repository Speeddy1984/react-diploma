import React from 'react';

function About() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">О магазине</h2>
            <p>В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам хочется возвращаться снова и снова.</p>
            <p className="h4 text-center">Мы предлагаем вам особые условия:</p>
            <ol>
              <li>Индивидуальный подход специалиста...</li>
              <li>Мы периодически проводим распродажи...</li>
              <li>У нас всегда есть из чего выбрать...</li>
              <li>Мы несем ответственность за все товары.</li>
              <li>Молодые мамы будут рады обширному ассортименту детских моделей.</li>
            </ol>
            <p>Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы зашли по верному адресу.</p>
            <p>У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки и туфли...</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default About;
