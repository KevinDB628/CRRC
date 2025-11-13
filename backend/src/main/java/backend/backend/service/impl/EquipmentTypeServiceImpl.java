package backend.backend.service.impl;

import backend.backend.entity.EquipmentType;
import backend.backend.mapper.EquipmentTypeMapper;
import backend.backend.service.EquipmentTypeService;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;

import java.util.List;

@Service
public class EquipmentTypeServiceImpl implements EquipmentTypeService {

    @Resource
    private EquipmentTypeMapper mapper;

    @Override
    public List<EquipmentType> findAll() {
        return mapper.findAll();
    }

    @Override
    public EquipmentType findById(Integer id) {
        return mapper.findById(id);
    }

    @Override
    public void insert(EquipmentType type) {

        // 检查重复
        if (mapper.countByName(type.getTypeName()) > 0) {
            throw new RuntimeException("类型名称不能重复！");
        }

        mapper.insert(type);
    }


    @Override
    public void update(EquipmentType type) {

        if (mapper.countByName(type.getTypeName()) > 0) {
            throw new RuntimeException("类型名称不能重复！");
        }

        mapper.update(type);
    }


    @Override
    public void delete(Integer id) {
        mapper.delete(id);
    }
}
