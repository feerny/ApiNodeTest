CREATE DEFINER=`root`@`localhost` PROCEDURE `employeedAddOrEdit`(
	in _id int,
    in _img varchar(200),
    in _name varchar(45),
    in _salary int(11)
)
BEGIN
	if _id  then
    		update employees
        set 
			name=_name,
            img=_img,
            salary=_salary
            where id =_id;

        
	else
		insert into employees(name,salary,img)
        values(_name,_salary,_img);
        
        set _id = last_insert_id();
	end if;
        
	select _id as id;
END