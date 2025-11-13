package backend.backend.entity;

public class EquipmentType {
    private Integer id;
    private String typeName;
    private Integer parentId;
    private Integer defaultCycle;
    private Integer status;
    private String desc;

    // ===== Getter 和 Setter 方法 =====
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }
    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Integer getParentId() {
        return parentId;
    }
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getDefaultCycle() {
        return defaultCycle;
    }
    public void setDefaultCycle(Integer defaultCycle) {
        this.defaultCycle = defaultCycle;
    }

    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }
}
