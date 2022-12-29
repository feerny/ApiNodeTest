CREATE DEFINER=`root`@`localhost` PROCEDURE `employeedAddOrEdit`(
	in _id int,
    in _name varchar(45),
    in _salary int(11)
)
BEGIN
	if _id  then
    		update employees
        set 
			name=_name,
            salary=_salary
            where id =_id;

        
	else
		insert into employees(name,salary)
        values(_name,_salary);
        
        set _id = last_insert_id();
	end if;
        
	select _id as id;
END