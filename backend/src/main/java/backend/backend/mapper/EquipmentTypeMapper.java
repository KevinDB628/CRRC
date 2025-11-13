package backend.backend.mapper;

import backend.backend.entity.EquipmentType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EquipmentTypeMapper {

    // 查询所有
    List<EquipmentType> findAll();

    // 根据 ID 查询
    EquipmentType findById(@Param("id") Integer id);

    // 新增
    int insert(EquipmentType type);

    // 更新
    int update(EquipmentType type);

    // 删除
    int delete(@Param("id") Integer id);

    //检查名称是否重复
    int countByName(String typeName);

}
