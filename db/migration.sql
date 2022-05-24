DROP DATABASE IF EXISTS todo_db;

CREATE DATABASE todo_db;

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
   id SERIAL PRIMARY KEY NOT NULL,
   task_content VARCHAR(100) NOT NULL,
   due_date date NOT NULL,
   completed boolean NOT NULL
);
