package backend.backend.controller;

import backend.backend.entity.EquipmentType;
import backend.backend.mapper.EquipmentTypeMapper;
import backend.backend.service.EquipmentTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;

import java.util.List;

@RestController
@RequestMapping("/api/equipmentTypes")
public class EquipmentTypeController {

    @Resource
    private EquipmentTypeService service;

    // 查询所有
    @GetMapping
    public List<EquipmentType> getAll() {
        return service.findAll();
    }

    // 根据 ID 查询
    @GetMapping("/{id}")
    public EquipmentType getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    // 新增
@PostMapping
public ResponseEntity<?> create(@RequestBody EquipmentType type) {
    try {
        service.insert(type);
        return ResponseEntity.ok("ok");
    } catch (Exception e) {
        // 捕获数据库唯一约束异常
        if (e.getMessage().contains("Duplicate") || e.getMessage().contains("uk_type_name")) {
            return ResponseEntity.status(400).body("类型名称已存在，不能重复！");
        }
        return ResponseEntity.status(500).body("服务器错误：" + e.getMessage());
    }
}


    // 修改
    @PutMapping("/{id}")
    public String update(@PathVariable Integer id, @RequestBody EquipmentType type) {
        type.setId(id);
        service.update(type);
        return "ok";
    }

    // 删除
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        service.delete(id);
        return "ok";
    }
}