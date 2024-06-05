User.destroy_all
Message.destroy_all

# Buat pengguna contoh
users = User.create!([
  { name: 'Alice'},
  { name: 'Bob'},
  { name: 'Charlie' }
])

# Buat pesan contoh untuk setiap pengguna
Message.create!([
  { body: 'Hello, this is Alice!', user: users[0] },
  { body: 'Hey, Bob here!', user: users[1] },
  { body: 'Charlie checking in.', user: users[2] },
  { body: 'Alice again, how are you?', user: users[0] },
  { body: 'Bob once more!', user: users[1] }
])