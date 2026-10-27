import { useState } from 'react';

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  quantity: number;
}

function App() {
  // Bagong mga Unsplash Image Links na tumutugma sa mga Tech Products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500', // Headphones
      name: 'Wireless Noise-Canceling Headphones',
      category: 'Audio',
      price: 199.99,
      rating: 4.8,
      quantity: 0,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', // Gaming Mouse
      name: 'Ergonomic Gaming Mouse',
      category: 'Peripherals',
      price: 49.99,
      rating: 4.5,
      quantity: 0,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500', // Mechanical Keyboard
      name: 'Mechanical Keyboard',
      category: 'Peripherals',
      price: 89.99,
      rating: 4.7,
      quantity: 0,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500', // 4K Monitor
      name: 'Ultra-Wide 4K Monitor',
      category: 'Displays',
      price: 449.99,
      rating: 4.9,
      quantity: 0,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states para sa Add Product modal
  const [newImage, setNewImage] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Audio');
  const [newPrice, setNewPrice] = useState('');

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const updatedQty = Math.max(0, p.quantity + delta);
          return { ...p, quantity: updatedQty };
        }
        return p;
      })
    );
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage || !newName || !newPrice) {
      alert('Paki-fill out ang lahat ng kinakailangang fields!');
      return;
    }

    const newProd: Product = {
      id: Date.now(),
      image: newImage,
      name: newName,
      category: newCategory,
      price: parseFloat(newPrice),
      rating: 4.5,
      quantity: 0,
    };

    setProducts([...products, newProd]);
    setNewImage('');
    setNewName('');
    setNewPrice('');
    setShowAddModal(false);
  };

  const filteredProducts =
    activeCategory === 'ALL'
      ? products
      : products.filter((p) => p.category.toUpperCase() === activeCategory);

  const totalCartItems = products.reduce((sum, p) => sum + p.quantity, 0);
  const overallTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        fontFamily: 'Inter, system-ui, sans-serif',
        paddingBottom: '50px',
      }}
    >
      {/* Navigation Header */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 30px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
          <span style={{ color: '#0f172a' }}>Product</span>
          <span style={{ color: '#ef4444' }}>ManagementApp</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            + ADD PRODUCT
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
            }}
          >
            🛒{' '}
            <span
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginLeft: '6px',
              }}
            >
              {totalCartItems}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#0f172a',
            fontWeight: 800,
            margin: '0 0 10px 0',
          }}
        >
          OUR TECH PRODUCTS
        </h1>
        <p
          style={{
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto 25px auto',
            fontSize: '1rem',
          }}
        >
          Explore our collection of high-performance peripherals and gear. Use the
          controls on each product card to select quantities for your order.
        </p>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '25px',
          }}
        >
          {['ALL', 'AUDIO', 'PERIPHERALS', 'DISPLAYS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: activeCategory === cat ? '#ef4444' : '#e2e8f0',
                color: activeCategory === cat ? 'white' : '#475569',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Overall Total */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          }}
        >
          <span style={{ fontWeight: 600, color: '#64748b', marginRight: '15px' }}>
            OVERALL TOTAL:
          </span>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444' }}>
            ${overallTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Product List Cards */}
      <div
        style={{
          maxWidth: '550px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                height: '260px',
                backgroundColor: '#f8fafc',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Product Info */}
            <div style={{ padding: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBottom: '8px',
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < Math.floor(product.rating) ? '#f59e0b' : '#cbd5e1',
                      fontSize: '1rem',
                    }}
                  >
                    ★
                  </span>
                ))}
                <span
                  style={{
                    color: '#64748b',
                    fontSize: '0.85rem',
                    marginLeft: '6px',
                  }}
                >
                  ({product.rating.toFixed(1)})
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: '0 0 10px 0',
                }}
              >
                {product.name}
              </h3>

              <button
                type="button"
                onClick={() => alert('Viewing specs for ' + product.name)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: 0,
                  cursor: 'pointer',
                  marginBottom: '20px',
                }}
              >
                ℹ️ View Description & Specs
              </button>

              <hr
                style={{
                  border: 'none',
                  borderTop: '1px solid #f1f5f9',
                  margin: '0 0 15px 0',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Subtotal:
                </span>
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.05rem',
                    color: '#0f172a',
                  }}
                >
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>

              {/* Counter and Add to Cart */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                  }}
                >
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: '#475569',
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      padding: '0 12px',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    }}
                  >
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: '#475569',
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    alert('Added ' + product.quantity + 'x ' + product.name + ' to cart!')
                  }
                  style={{
                    flex: 1,
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Drawer */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '450px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ marginTop: 0, color: '#0f172a' }}>Add New Product</h2>
            <form onSubmit={handleAddProductSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '5px',
                    fontSize: '0.85rem',
                  }}
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '5px',
                    fontSize: '0.85rem',
                  }}
                >
                  Product Name:
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Earbuds"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '5px',
                    fontSize: '0.85rem',
                  }}
                >
                  Category:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: 'white',
                  }}
                >
                  <option value="Audio">Audio</option>
                  <option value="Peripherals">Peripherals</option>
                  <option value="Displays">Displays</option>
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '5px',
                    fontSize: '0.85rem',
                  }}
                >
                  Price ($):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="99.99"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#e2e8f0',
                    color: '#475569',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
