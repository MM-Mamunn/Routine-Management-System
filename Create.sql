CREATE TABLE course(
	code varchar(20) NOT NULL  PRIMARY KEY,
	credit  NUMERIC ,
	title varchar(50) ,
	type varchar(50) ,
	prereq varchar(20) REFERENCES course(code) ON UPDATE CASCADE
);





CREATE TABLE faculty(
	code varchar(200) NOT NULL  PRIMARY KEY,
	name varchar(50),
	desig varchar(200),
	phone varchar(20),
	email varchar(40),
	type varchar(50) 
);

CREATE TABLE section(
	sec varchar(10) NOT NULL  PRIMARY KEY,
	cr varchar(50),
	cr_phone varchar(20),
	acr varchar(50),
	acr_phone varchar(20),
	"from" varchar(20),
	"to" varchar(20),
	type varchar(20) 
);

CREATE TABLE classroom(
	room varchar(10) NOT NULL  PRIMARY KEY,
	capacity integer,
	projector boolean,
	mic boolean,
	area numeric,
	building varchar(30),
	type varchar(20) 
);


CREATE TABLE class(
	faculty varchar(20) NOT NULL REFERENCES faculty(code)  ON DELETE CASCADE ON UPDATE CASCADE,
	room varchar(100) NOT NULL REFERENCES classroom(room)  ON UPDATE CASCADE,
	sec     varchar(10) NOT NULL REFERENCES section(sec)  ON DELETE CASCADE ON UPDATE CASCADE,
	slot INTEGER NOT NULL,
	"day" INTEGER NOT NULL
	-- code varchar(20) NOT NULL REFERENCES course(code) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE class
ADD COLUMN class_id SERIAL PRIMARY KEY;
ALTER TABLE class
ADD COLUMN code varchar(20) NOT NULL REFERENCES course(code) ON DELETE CASCADE ON UPDATE CASCADE;



CREATE TABLE student(
	id varchar(200) NOT NULL  PRIMARY KEY,
	"password" varchar(30) NOT NULL,
	name varchar(50) NOT NULL,
	sec varchar(10) NOT NULL REFERENCES "section"(sec),
	phone varchar(20),
	email varchar(40),
	type varchar(50) 
);





CREATE TABLE student_course(
	id varchar(20) not null REFERENCES student(id) on delete cascade on update cascade,
	class_id SERIAL NOT NULL REFERENCES "class"(class_id) on delete cascade on update cascade
);
