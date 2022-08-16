# WORKSHOP

## Software
    https://insomnia.rest/
    โปรแกรมทดสอบ API

## Reference
    https://loopback.io/doc/en/lb4/DataSource-generator.html

## Manual 
    สร้างชุดการทำงานของ MongoDB โดยใช้ลำดับคำสั่งดังนี้
    - lb4 datasource
    - lb4 repository 
    - lb4 model  :  เลือกสร้าง  Entity
    - lb4 controller :  เลือกสร้าง  CRUD
## Story and Requirement
    ความต้องการพัฒนาระบบจองการบำบัดโดยต่อไปนี้จะเรียกว่า Book ในโรงพยายาล โดยทางหัวหน้า IT ต้องการให้พัฒนาเป็น
    Web Application แยกต่างหาก และ คุณได้รับหมอบหมายให้พัฒนา API สำหรับระบบนี้
    ระบบจำเป็นต้องใช้ข้อมูลของผู้ป่วยจาก HIS เดิม (MSSQL) แต่ระบบให้ทำงานแยกต่างหากบน (MongoDB)
    จึงจำเป็นต้อง Lookup ข้อมูลจาก HIS ก่อน
        
    1. ผู้ใช้งานสามารถเพิ่มลบแก้ไข รายการการบำบัดได้ (CRUD) โดยมี interface ดังนี้ (Template ของการ Book)
        มีข้อมูลดังนี้ code, name, price
    2. การจองการบำบัด ทำงานโดนคีย์​ HN ที่ตรงกันเท่านั้น
        ** เมื่อมีข้อมูลในระบบแล้วจะไป lookup ที่ HIS เพื่อลดภาระการทำงาน
    3. การ Book แต่ละครั้งจะต้องระบุ CODE ของรายการ การบำบัด เพื่อนำมาบันทึกการ Book
    4. ระบบจะต้องแสดงรายการจองทั้งหมดของผู้ป่วยได้โดยระบุจาก HN ผู้ป่วย

## Spec Requirement
    ถ้ารายการมี CODE นั้นอยู่แล้วให้ตอบ ERROR
    Optional: เมื่อทำรายการแต่ละ Book ต้องมีการบันทึกเวลาของการ Book แต่ละรอบด้วย



