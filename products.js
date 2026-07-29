const products = [
  {
    id: 18, // Asegúrate de que sea un número de ID único que no se repita
    name: "Cambio de Tapa de Vidrio (Láser)",
    category: "Servicio Técnico",
    price: 80000,
    shortDescription: "Reemplazo de tapa trasera con máquina láser para cualquier modelo.",
    description: "Renová la estética de tu equipo sin dañar componentes internos. Utilizamos tecnología láser de última generación para retirar el vidrio roto de forma limpia y segura. El precio aplica para cualquier modelo.",
    images: [
      "assets/products/450e9cec-c451-4834-810c-638254a4c217.jfif","assets/products/c76509ce-85bc-4a1e-81a8-71a7a20e7234.jfif" // Puedes poner la foto de referencia o de tus trabajos
    ],
    variants: [], // Sin variantes complejas, ya que el modelo lo escribirán abajo
    specs: [
      "Trabajo con tecnología láser",
      "No daña los componentes internos",
      "Resultado estético impecable",
      "Precio válido para cualquier modelo"
    ],
    badge: "SERVICE",
    featured: true,
    commentPrompt: "Ingresá el modelo exacto de tu celular (Ej: iPhone 11, iphone 15 pro):" // ¡Esto crea la cajita de texto!
  },
  {
    id: 17, // Asegúrate de asignar un ID único para este producto
    name: "Cargador portátil de metal 10000mAh con pantalla digital de porcentaje.", // He usado la info de la imagen pero con 10k mAh
    category: "Cargadores", // Categoría apropiada para este artículo
    price: 35000, // Precio de OFERTA actual
    oldPrice: 40000, // Precio anterior para el tachado
    shortDescription: "Cargador portátil",
    description: "La batería portátil cuenta con un cuerpo metálico duradero, pantalla digital para visualizar el porcentaje de batería y tecnología de carga rápida para tus dispositivos. Es la solución compacta perfecta para no quedarte sin energía.",
    images: [
      "assets/products/e76ed04a-02da-4e84-8542-84317c44a72a.jpg", // Debes subir las fotos reales a tu carpeta assets y nombrarlas así
    ],
    variants: [
      {
        name: "Color",
        options: ["Negro Metálico"] // Cambia por los colores reales que tengas en stock
      }
    ],
    specs: [
      "Capacidad: 10000mAh",
      "Pantalla digital LED (porcentaje de batería)",
      "Cuerpo de metal duradero",
      "Tecnología de carga rápida (PD/QC3.0)"
    ],
    badge: "¡OFERTA!", // Insignia llamativa en la tarjeta del producto
    featured: true, // Si es 'true', aparecerá destacado al principio del catálogo
    commentPrompt: "¿Preferís un color en especial si no hay stock del elegido?"
  },
  {
    id: 16,
    name: "Cargador inalámbrico MagSafe Only ION",
    category: "Cargadores",
    images: ["assets/products/cargador-inalambrico-magsafe-only-ion-01.jpeg"],
    description: "Cargador inalámbrico magnético Only ION estilo MagSafe con cable Type-C integrado. Ideal para iPhone compatibles con carga magnética. Stock disponible: 4 unidades.",
    shortDescription: "Cargador inalámbrico magnético MagSafe con cable Type-C.",
    price: 20000,
    badge: "4 en stock",
    featured: true,
    variants: [{ name: "Color", options: ["Blanco"] }],
    specs: ["4 unidades disponibles", "Carga inalámbrica magnética", "Estilo MagSafe", "Cable Type-C integrado", "Color blanco"],
  },
  {
    id: 15,
    name: "Fundas silicona iPhone XR",
    category: "Fundas",
    images: ["assets/products/fundas-silicona-iphone-xr.png"],
    description: "Fundas de silicona para iPhone XR disponibles en varios colores. Elegí el color según la foto antes de agregar al carrito.",
    shortDescription: "Fundas de silicona para iPhone XR en varios colores.",
    price: 7000,
    badge: "iPhone XR",
    featured: true,
    commentPrompt: "Color de funda",
    commentPlaceholder: "Ejemplo: rosa, negro, blanco o naranja",
    variants: [{ name: "Modelo", options: ["iPhone XR"] }],
    specs: ["Modelo iPhone XR", "Material silicona", "Varios colores disponibles", "Indicar color en comentario"],
  },
  {
    id: 14,
    name: "Cargador portátil Tars 20000 mAh",
    category: "Cargadores",
    images: ["assets/products/tars-20000mah-magsafe-01.png", "assets/products/tars-20000mah-magsafe-02.png", "assets/products/tars-20000mah-magsafe-03.png", "assets/products/tars-20000mah-magsafe-04.png"],
    description: "Cargador portátil Tars de 20000 mAh con MagSafe, carga wireless y cables incluidos. Diseño 4 en 1 con cables Type-C y Lightning integrados.",
    shortDescription: "Power bank 20000 mAh con MagSafe y cables incluidos.",
    price: 50000,
    badge: "MagSafe",
    featured: true,
    variants: [{ name: "Capacidad", options: ["20000 mAh"] }],
    specs: ["20000 mAh", "Presenta MagSafe", "Carga wireless", "Cables incluidos", "Type-C y Lightning", "Diseño 4 en 1"],
  },
  {
    id: 13,
    name: "Auriculares XAEA Crows",
    category: "Audio",
    images: ["assets/products/xaea-crows-01.png", "assets/products/xaea-crows-02.png", "assets/products/xaea-crows-03.png"],
    description: "Auriculares XAEA Crows color negro con conexión wireless, batería de alto rendimiento y puerto de carga USB-C. Stock disponible: 2 unidades.",
    shortDescription: "Wireless color negro, carga USB-C. 2 unidades disponibles.",
    price: 25000,
    badge: "3 en stock",
    featured: true,
    variants: [{ name: "Color", options: ["Negro"] }],
    specs: ["2 unidades disponibles", "Color negro", "Conexión wireless", "Puerto de carga USB-C", "Batería de alto rendimiento"],
  },
  {
    id: 12,
    name: "Smartwatch Z66 Ultra",
    category: "Smartwatch",
    images: ["assets/products/smartwatch-z66-ultra-01.png"],
    description: "Smartwatch Z66 Ultra con pantalla grande de 1.93 pulgadas, correa negra y cable de carga incluido. Stock disponible: 2 unidades.",
    shortDescription: "Pantalla 1.93, correa negra y cargador incluido. 2 unidades disponibles.",
    price: 25000,
    badge: "2 en stock",
    featured: true,
    variants: [{ name: "Color", options: ["Negro"] }],
    specs: ["2 unidades disponibles", "Pantalla 1.93 pulgadas", "Correa negra", "Cable de carga incluido", "Estilo Watch Ultra"],
  },
  {
    id: 11,
    name: "iPhone 12 Pro 128GB",
    category: "Celulares",
    images: ["assets/products/iphone-12-pro-128gb-01.png", "assets/products/iphone-12-pro-128gb-02.png", "assets/products/iphone-12-pro-128gb-03.png", "assets/products/iphone-12-pro-128gb-04.png", "assets/products/iphone-12-pro-128gb-05.png", "assets/products/iphone-12-pro-128gb-06.png", "assets/products/iphone-12-pro-128gb-07.png"],
    description: "iPhone 12 Pro de 128GB en excelente estado, con condición de batería al 100%. Incluye 2 fundas a elección, cargador original y blindex de regalo.",
    shortDescription: "128GB, batería 100%, 2 fundas, cargador original y blindex de regalo.",
    price: 550000,
    badge: "Batería 100%",
    featured: true,
    variants: [{ name: "Memoria", options: ["128GB"] }],
    specs: ["iPhone 12 Pro", "128GB de almacenamiento", "Condición de batería 100%", "Incluye 2 fundas a elección", "Cargador original incluido", "Blindex de regalo"],
  },
  {
    id: 9,
    name: "Combo cargador iPhone",
    category: "Cargadores",
    images: ["assets/products/combo-cargador-iphone.png", "assets/products/cargador-iphone-detalle.png"],
    description: "Combo para iPhone con cargador USB-C 20W y cable USB-C a Lightning de 1 metro. Ideal para carga rápida y uso diario.",
    shortDescription: "Cargador USB-C 20W + cable Lightning de 1 metro.",
    price: 35000,
    badge: "Combo",
    featured: true,
    variants: [{ name: "Incluye", options: ["Cargador + cable"] }],
    specs: ["Cargador USB-C 20W", "Cable USB-C a Lightning", "Cable de 1 metro", "Compatible con iPhone"],
  },
  {
    id: 10,
    name: "Fundas MagSafe iPhone 13",
    category: "Fundas",
    images: ["assets/products/fundas-magsafe-iphone-13-v2.png"],
    description: "Fundas MagSafe para iPhone 13. Elegí el color de la funda según la foto y escribilo en el comentario antes de agregar al carrito.",
    shortDescription: "Elegí el color de la funda: azul, titanio o transparente.",
    price: 7000,
    badge: "iPhone 13",
    featured: true,
    commentPrompt: "Color de funda",
    commentPlaceholder: "Ejemplo: azul, titanio o transparente",
    variants: [{ name: "Modelo", options: ["iPhone 13"] }],
    specs: ["Diseño MagSafe", "Modelo iPhone 13", "Opciones por color en foto", "Indicar color en comentario"],
  },
  {
    id: 7,
    name: "Auriculares AiPods 06",
    category: "Audio",
    images: ["assets/products/aipods-06-pack.jpeg", "assets/products/aipods-06-dorado-detalle.png", "assets/products/aipods-06-negro.jpeg"],
    description: "Auriculares inalámbricos AiPods 06 con estuche de carga, diseño compacto y autonomía de hasta 6 horas. Disponible únicamente en color dorado.",
    shortDescription: "Inalámbricos con estuche de carga. Solo color dorado.",
    price: 25000,
    badge: "4 en stock",
    featured: true,
    variants: [{ name: "Color", options: ["Dorado"] }],
    specs: ["4 unidades disponibles", "Color dorado", "Hasta 6 horas de autonomía", "Estuche de carga incluido"],
  },
  {
    id: 8,
    name: "Auriculares JBL",
    category: "Audio",
    images: ["assets/products/jbl-blanco-frente.png", "assets/products/jbl-blanco-detalle.png"],
    description: "Auriculares inalámbricos estilo vincha JBL en color blanco, con sonido potente, conexión wireless y controles integrados. Últimas unidades disponibles.",
    shortDescription: "Auriculares wireless color blanco. Últimas unidades.",
    price: 35000,
    badge: "Últimas 2",
    featured: true,
    variants: [{ name: "Color", options: ["Blanco"] }],
    specs: ["2 unidades disponibles", "Color blanco", "Conexión wireless", "Controles integrados"],
  },
];
