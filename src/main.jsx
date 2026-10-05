import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Check, ChevronDown, Heart, Leaf, Menu, Package, Plus,
  Recycle, Search, ShoppingBag, Sparkles, UserRound, X
} from "lucide-react";
import "./styles.css";

const products = [
  {
    id: 1, name: "Bolsa Aurora", category: "Acessórios", price: 189,
    artisan: "Ana", material: "Retalhos de algodão", rescued: "1,2 kg",
    impact: "Cada bolsa reaproveita tecidos que seriam descartados e gera renda para a artesã.",
    tone: "sage", badge: "Peça única"
  },
  {
    id: 2, name: "Jaqueta Recomeço", category: "Roupas", price: 329,
    artisan: "Maria", material: "Jeans reaproveitado", rescued: "2,8 kg",
    impact: "Uma jaqueta criada a partir de jeans recuperado, prolongando o ciclo de vida do tecido.",
    tone: "clay", badge: "Destaque"
  },
  {
    id: 3, name: "Carteira Raiz", category: "Acessórios", price: 89,
    artisan: "Joana", material: "Sarja e algodão", rescued: "0,4 kg",
    impact: "Pequenos retalhos ganham uma nova função e retornam ao mercado como produto durável.",
    tone: "sand", badge: "Peça única"
  },
  {
    id: 4, name: "Camisa Horizonte", category: "Roupas", price: 219,
    artisan: "Lúcia", material: "Camisa social reaproveitada", rescued: "0,9 kg",
    impact: "Modelagem autoral feita com peças recuperadas, reduzindo a necessidade de matéria-prima virgem.",
    tone: "olive", badge: "Novo"
  },
  {
    id: 5, name: "Necessaire Ciclo", category: "Acessórios", price: 79,
    artisan: "Carla", material: "Retalhos têxteis", rescued: "0,3 kg",
    impact: "Aproveitamento inteligente de sobras da produção para criar um acessório funcional.",
    tone: "forest", badge: "Peça única"
  },
  {
    id: 6, name: "Colete Encontro", category: "Roupas", price: 249,
    artisan: "Renata", material: "Jeans e sarja", rescued: "1,7 kg",
    impact: "Mistura de materiais recuperados em uma peça que valoriza o trabalho manual.",
    tone: "rose", badge: "Destaque"
  }
];

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProductCard({ product, onAdd, onImpact }) {
  return (
    <article className="product-card">
      <button className={`product-image ${product.tone}`} onClick={() => onImpact(product)} aria-label={`Ver impacto de ${product.name}`}>
        <span className="badge">{product.badge}</span>
        <span className="image-mark"><Leaf size={26}/></span>
        <span className="image-caption">UPCYCLING</span>
      </button>
      <div className="product-info">
        <div className="product-topline">
          <span>{product.category}</span>
          <button className="heart" aria-label="Favoritar"><Heart size={18}/></button>
        </div>
        <h3>{product.name}</h3>
        <p className="artisan">Feita por {product.artisan}</p>
        <div className="product-bottom">
          <strong>{money(product.price)}</strong>
          <button className="add-button" onClick={() => onAdd(product)}><Plus size={17}/> Adicionar</button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [impact, setImpact] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecomoda-cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ecomoda-cart", JSON.stringify(cart));
  }, [cart]);

  const filtered = useMemo(() => products.filter(p => {
    const matchCategory = category === "Todos" || p.category === category;
    const text = `${p.name} ${p.artisan} ${p.material}`.toLowerCase();
    return matchCategory && text.includes(search.toLowerCase());
  }), [category, search]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product) {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      if (found) return current.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      return [...current, {...product, qty: 1}];
    });
    setCartOpen(true);
  }

  function changeQty(id, delta) {
    setCart(current => current
      .map(item => item.id === id ? {...item, qty: item.qty + delta} : item)
      .filter(item => item.qty > 0)
    );
  }

  return (
    <div>
      <div className="announcement">
        <Recycle size={15}/> Cada peça conta uma história. Descubra quem fez a sua.
      </div>

      <header className="header">
        <a className="logo" href="#inicio" aria-label="EcoModa">
          <span className="logo-icon"><Leaf size={20}/></span>
          <span>Eco<span>Moda</span></span>
        </a>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#colecao" onClick={() => setMenuOpen(false)}>Coleção</a>
          <a href="#impacto" onClick={() => setMenuOpen(false)}>Nosso impacto</a>
          <a href="#artesas" onClick={() => setMenuOpen(false)}>Artesãs</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>O Instituto</a>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <Search size={17}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar peça..." />
          </div>
          <button className="icon-btn desktop-only" aria-label="Conta"><UserRound size={20}/></button>
          <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">
            <ShoppingBag size={20}/><span>{count}</span>
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menu"><Menu size={22}/></button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15}/> Moda com propósito</span>
            <h1>Vista uma história.<br/><em>Transforme</em> um futuro.</h1>
            <p>Peças autorais feitas com tecidos que ganham uma segunda vida — e com o trabalho de mulheres que transformam suas próprias histórias.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#colecao">Explorar coleção <ArrowRight size={18}/></a>
              <a className="text-btn" href="#impacto">Como funciona <ChevronDown size={17}/></a>
            </div>
            <div className="trust-row">
              <span><Check size={16}/> Upcycling</span>
              <span><Check size={16}/> Produção local</span>
              <span><Check size={16}/> Impacto rastreável</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-card card-back"></div>
            <div className="art-card card-main">
              <span>01 / 04</span>
              <div className="hero-symbol"><Leaf size={72}/></div>
              <strong>feito à mão,<br/>feito para durar.</strong>
            </div>
            <div className="floating-note"><Recycle size={18}/><div><b>12,4 kg</b><small>de tecido já resgatados</small></div></div>
          </div>
        </section>

        <section className="stats">
          <div><strong>+1.280</strong><span>peças com nova vida</span></div>
          <div><strong>10</strong><span>artesãs na rede</span></div>
          <div><strong>+860 kg</strong><span>de tecido reaproveitado</span></div>
          <div><strong>100%</strong><span>feito em pequena escala</span></div>
        </section>

        <section className="collection section" id="colecao">
          <div className="section-heading">
            <div><span className="eyebrow">A coleção</span><h2>Única como a história<br/>por trás de cada peça.</h2></div>
            <p>Não produzimos em massa. Recriamos materiais existentes em peças que carregam identidade, cuidado e propósito.</p>
          </div>

          <div className="filters">
            {["Todos", "Roupas", "Acessórios"].map(item =>
              <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
            )}
            <span className="result-count">{filtered.length} peças</span>
          </div>

          <div className="product-grid">
            {filtered.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} onImpact={setImpact}/>)}
          </div>
          {filtered.length === 0 && <div className="empty">Nenhuma peça encontrada. Tente outro termo.</div>}
        </section>

        <section className="impact section" id="impacto">
          <div className="impact-visual"><div className="impact-circle"><Recycle size={64}/></div></div>
          <div className="impact-copy">
            <span className="eyebrow">Muito além da roupa</span>
            <h2>Você compra uma peça.<br/><em>O impacto vai muito além.</em></h2>
            <p>Na EcoModa, cada produto tem uma história rastreável. Você pode conhecer o material recuperado, a artesã responsável e o impacto gerado pela sua escolha.</p>
            <div className="impact-list">
              <div><span>01</span><div><b>Material</b><small>Descubra de onde veio o tecido e quanto foi reaproveitado.</small></div></div>
              <div><span>02</span><div><b>Artesã</b><small>Conheça quem colocou as mãos, técnica e história na sua peça.</small></div></div>
              <div><span>03</span><div><b>Impacto</b><small>Acompanhe o benefício ambiental e social da compra.</small></div></div>
            </div>
          </div>
        </section>

        <section className="artesas section" id="artesas">
          <div className="section-heading">
            <div><span className="eyebrow">Quem faz</span><h2>Talento que merece<br/><em>ser visto.</em></h2></div>
            <p>Por trás de cada criação existe uma mulher, uma técnica e uma oportunidade de construir um futuro com mais autonomia.</p>
          </div>
          <div className="artisan-grid">
            {["Ana", "Maria", "Joana", "Lúcia"].map((name, i) =>
              <div className="artisan-card" key={name}>
                <div className={`artisan-photo p${i+1}`}><span>{String(i+1).padStart(2,"0")}</span></div>
                <h3>{name}</h3><p>Artesã EcoModa</p>
              </div>
            )}
          </div>
        </section>

        <section className="manifesto" id="sobre">
          <div><span className="eyebrow">O Instituto EcoModa</span><h2>Moda não precisa<br/>custar o <em>futuro.</em></h2></div>
          <p>Somos uma ONG e marca autoral que une upcycling, design e geração de renda. Nosso trabalho transforma sobras em oportunidades — e aproxima quem compra de quem faz.</p>
          <a className="primary-btn light" href="#inicio">Conheça nossa história <ArrowRight size={18}/></a>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><a className="logo" href="#inicio"><span className="logo-icon"><Leaf size={20}/></span><span>Eco<span>Moda</span></span></a><p>Moda sustentável feita por pessoas, para pessoas.</p></div>
        <div><b>Comprar</b><a href="#colecao">Coleção</a><a href="#impacto">Impacto</a></div>
        <div><b>Instituto</b><a href="#artesas">Artesãs</a><a href="#sobre">Nossa história</a></div>
        <div><b>Contato</b><span>Seg–Sex, 9h–17h</span><span>contato@ecomoda.org</span></div>
      </footer>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"}>
        <div className="drawer-head"><div><span className="eyebrow">Seu carrinho</span><h2>{count} {count === 1 ? "item" : "itens"}</h2></div><button onClick={() => setCartOpen(false)}><X/></button></div>
        {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={40}/><h3>Seu carrinho está vazio</h3><p>Escolha uma peça única para começar.</p><button className="primary-btn" onClick={() => setCartOpen(false)}>Ver coleção</button></div> :
          <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><div className={`mini-image ${item.tone}`}><Leaf size={20}/></div><div className="cart-item-info"><b>{item.name}</b><small>Feita por {item.artisan}</small><strong>{money(item.price)}</strong><div className="qty"><button onClick={() => changeQty(item.id,-1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}>+</button></div></div></div>)}</div><div className="cart-footer"><div><span>Subtotal</span><strong>{money(total)}</strong></div><button className="primary-btn full">Continuar para pagamento <ArrowRight size={18}/></button><small>Frete calculado na próxima etapa.</small></div></>}
      </aside>

      {impact && <div className="modal-overlay" onClick={() => setImpact(null)}><div className="impact-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setImpact(null)}><X/></button><div className={`modal-image ${impact.tone}`}><Leaf size={48}/></div><div className="modal-content"><span className="eyebrow">Rastreabilidade da peça</span><h2>{impact.name}</h2><p>{impact.impact}</p><div className="trace-grid"><div><small>ARTESÃ</small><b>{impact.artisan}</b></div><div><small>MATERIAL</small><b>{impact.material}</b></div><div><small>REAPROVEITADO</small><b>{impact.rescued}</b></div></div><button className="primary-btn full" onClick={() => {addToCart(impact); setImpact(null)}}>Adicionar ao carrinho <ArrowRight size={18}/></button></div></div></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
