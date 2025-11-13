package backend.backend.service;

import backend.backend.entity.EquipmentType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface EquipmentTypeService {

    // 查询所有
    List<EquipmentType> findAll();

    // 根据 ID 查询
    EquipmentType findById(@Param("id") Integer id);

    // 新增
    void insert(EquipmentType type);

    // 更新
    void update(EquipmentType type);

    // 删除
    void delete(@Param("id") Integer id);


}
