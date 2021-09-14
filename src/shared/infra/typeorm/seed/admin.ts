import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const pass = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
      values('${id}', 'admin', 'admin@rentx.com.br', '${pass}', '1234' ,true, 'now()') 
    `
  );

  await connection.close();
}

create().then(() => console.log('Admin user created!'));
