// package backend.backend.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/equipmentTypes")
// @CrossOrigin(origins = "*")  // 允许前端访问
// public class DBTestController {

//     @Autowired
//     private JdbcTemplate jdbcTemplate;

//     @GetMapping
//     public List<Map<String, Object>> getEquipmentTypes() {
//         // 查询 equipment_type 表的全部数据
//         String sql = "SELECT * FROM equipment_type";
//         return jdbcTemplate.queryForList(sql);
//     }
// }
