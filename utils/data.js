import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Tito',
      email: 'tito@tito.com',
      password: bcrypt.hashSync('tito'),
      isAdmin: true,
    },
    {
      name: 'Toto',
      email: 'toto@toto.com',
      password: bcrypt.hashSync('toto'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Shirt 001',
      slug: 'shirt-001',
      category: 'Shirts',
      image: '/images/shirt1.png',
      price: 70,
      brand: 'Lowkey',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Shirt 002',
      slug: 'shirt-002',
      category: 'Shirts',
      image: '/images/shirt2.png',
      price: 70,
      brand: 'Lowkey',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Shirt 003',
      slug: 'shirt-003',
      category: 'Shirts',
      image: '/images/shirt3.png',
      price: 70,
      brand: 'Lowkey',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Shirt 004',
      slug: 'shirt-004',
      category: 'Shirts',
      image: '/images/shirt4.png',
      price: 70,
      brand: 'Lowkey',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Shirt 005',
      slug: 'shirt-005',
      category: 'Shirts',
      image: '/images/shirt5.png',
      price: 70,
      brand: 'Lowkey',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Shirt 006',
      slug: 'shirt-006',
      category: 'Shirts',
      image: '/images/shirt6.png',
      price: 70,
      brand: 'Lowkey',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
  ],
};

export default data;
