package com.google.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.www.exception.ResourceNotFoundException;
import com.google.www.model.Employee;
import com.google.www.repo.EmployeeRepository;

@Service
public class EmployeeService 
{
	@Autowired 
	EmployeeRepository employeeRepository;
	
	public Employee addEmployee(Employee employee)
	{
		return employeeRepository.save(employee);
	}
	public List<Employee> getAllEmployees()
	{
		return employeeRepository.findAll();
	}
	
	public Employee getEmployeeById(long id)
	{
		return employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Id Not Found"));
	}
	
	public ResponseEntity<Employee> updateEmployee(long id,Employee employee)
	{
		if(employeeRepository.existsById(id))
		{
			Employee existingEmp = employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
			existingEmp.setName(employee.getName());
			existingEmp.setDoj(employee.getDoj());
			existingEmp.setDept(employee.getDept());
			employeeRepository.save(existingEmp);
			return new ResponseEntity<>(existingEmp,HttpStatus.OK);
			
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<HttpStatus> deleteEmployee(long id)
	{
		Employee employee = employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
		employeeRepository.delete(employee);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
