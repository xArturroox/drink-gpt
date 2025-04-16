

create table drinks (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  name varchar(255) not null unique,
  recipe varchar(2000) not null
);

create table ingredients (
  id int GENERATED ALWAYS AS IDENTITY primary key,
  name varchar(255) not null unique,
  available BOOLEAN not null
);

create table drink_ingredients (
  drink_id int not null,
  ingredient_id int not null,
  quantity decimal not null,
  unit varchar(50) not null,
  primary key (drink_id, ingredient_id),
  foreign key (drink_id) references drinks(id),
  foreign key (ingredient_id) references ingredients(id)
);

create table orders (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  drink_name varchar(255) not null,
  ingredients varchar(1000) not null,
  recipe varchar(2000) not null,
  guest_name varchar(255) not null,
  order_timestamp timestamp not null,
  served BOOLEAN not null
);

create index idx_ingredients_available on ingredients(available);
create index idx_orders_order_timestamp on orders(order_timestamp);