select room from (
	select room, coalesce(code,'specialType') as code  from classroom natural left outer join 
	  (select * from class where day = 0 and slot = 1) as t1
    ) as t2 where code ='specialType' 