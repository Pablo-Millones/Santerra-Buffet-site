import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  image?: string;
}

interface MenuCategory {
  name: string;
  description: string;
  items: MenuItem[];
}

interface MenuProps {
  categories: MenuCategory[];
}

export default function Menu({ categories }: MenuProps) {
  return (
    <section id="menu" className="section-padding">
      <div className="container-custom">
        <h2 className="section-title">Nuestro Menú</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Descubre la variedad de nuestras estaciones, cada una cuidadosamente preparada para ofrecerte lo mejor de la cocina internacional y local.
        </p>

        <div className="mt-12 grid gap-8">
          {/* Featured station highlight */}
          <motion.div
            key="featured"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.8 }
              }
            }}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-primary via-primary-dark to-primary rounded-xl p-6 text-white"
          >
            <h3 className="text-2xl font-semibold mb-4">Estación Destacada: Pasta Fresca</h3>
            <p className="mb-4">
              Disfruta de nuestras pastas hechas en casa, preparadas al momento con salsas tradicionales e innovadoras.
            </p>
            <a
              href="#"
              className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 text-white font-medium"
            >
              Ver Más
            </a>
          </motion.div>

          {/* Menu categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={`category-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary mb-4">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={`item-${itemIndex}`}
                        className="flex items-start space-x-4"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-secondary">{item.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}