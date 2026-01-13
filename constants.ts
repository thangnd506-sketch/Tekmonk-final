import { Region, Place, Food } from './types';

export const VIETNAM_PLACES: Place[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    region: Region.NORTH,
    lat: 21.0285,
    lng: 105.8542,
    zoom: 13,
    description: 'Thủ đô nghìn năm văn hiến với nét đẹp cổ kính pha lẫn hiện đại.',
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=800',
    rating: 4.9,
    bestTime: 'Tháng 9 - Tháng 11',
    specialties: ['Phở', 'Bún chả', 'Bún thang', 'Chả cá Lã Vọng'],
    attractions: [
      { 
        id: 'hn-1', 
        name: 'Hồ Hoàn Kiếm', 
        description: 'Trái tim của thủ đô gắn liền với truyền thuyết trả gươm thần.', 
        image: 'https://images.unsplash.com/photo-1509030464152-c23898ad172a?q=80&w=600', 
        lat: 21.0286, 
        lng: 105.8521, 
        rating: 4.9, 
        category: 'History', 
        goldenHours: '05:00 - 07:00', 
        goldenHourReason: 'Ngắm bình minh và nhịp sống tập dưỡng sinh của người Hà Nội.',
        travelNotes: ['Có phố đi bộ vào cuối tuần (thứ 6 - CN).', 'Cẩn thận đồ đạc ở khu vực đông người.', 'Nên mua kem Tràng Tiền để thưởng thức khi đi dạo.'],
        nearbyRestaurants: [{ name: 'Phở Thìn Bờ Hồ', dish: 'Phở bò', rating: 4.8 }], 
        nearbyAttractions: [{ name: 'Đền Ngọc Sơn', distance: '0.1km', significance: 'Biểu tượng tâm linh nằm giữa hồ với cầu Thê Húc đỏ rực.' }] 
      },
      { 
        id: 'hn-2', 
        name: 'Văn Miếu Quốc Tử Giám', 
        description: 'Đại học đầu tiên của Việt Nam, biểu tượng của tinh thần hiếu học.', 
        image: 'https://images.unsplash.com/photo-1620216447192-d61053df28d8?q=80&w=600', 
        lat: 21.0293, 
        lng: 105.8355, 
        rating: 4.8, 
        category: 'History', 
        goldenHours: '08:30 - 10:00', 
        goldenHourReason: 'Nắng sớm chiếu qua tán cây cổ thụ.',
        travelNotes: ['Yêu cầu trang phục lịch sự (không mặc váy ngắn/quần đùi).', 'Không chạm tay vào đầu rùa tại bia Tiến sĩ.', 'Vé vào cửa khoảng 30,000đ.'],
        nearbyRestaurants: [{ name: 'Koto Van Mieu', dish: 'Bún chả', rating: 4.7 }], 
        nearbyAttractions: [{ name: 'Bảo tàng Mỹ thuật', distance: '0.3km', significance: 'Nơi lưu giữ tinh hoa hội họa và điêu khắc Việt Nam.' }] 
      },
      { 
        id: 'hn-3', 
        name: 'Lăng Bác', 
        description: 'Nơi an nghỉ của Chủ tịch Hồ Chí Minh vĩ đại.', 
        image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=600', 
        lat: 21.0368, 
        lng: 105.8346, 
        rating: 5.0, 
        category: 'History', 
        goldenHours: '06:00 - 07:30', 
        goldenHourReason: 'Xem lễ thượng cờ trang nghiêm.',
        travelNotes: ['Đóng cửa vào thứ Hai và thứ Sáu.', 'Không được quay phim, chụp ảnh bên trong lăng.', 'Giữ trật tự tuyệt đối và đi theo hàng.'],
        nearbyRestaurants: [{ name: 'Bánh tôm Hồ Tây', dish: 'Bánh tôm', rating: 4.5 }], 
        nearbyAttractions: [{ name: 'Chùa Một Cột', distance: '0.1km', significance: 'Kiến trúc chùa độc đáo nhất Việt Nam hình đóa sen.' }] 
      },
      { 
        id: 'hn-4', 
        name: 'Nhà thờ Lớn', 
        description: 'Kiến trúc Gothic cổ điển, trung tâm sinh hoạt của cộng đồng Công giáo.', 
        image: 'https://images.unsplash.com/photo-1599708153386-62e2d062860a?q=80&w=600', 
        lat: 21.0287, 
        lng: 105.8490, 
        rating: 4.7, 
        category: 'History', 
        goldenHours: '16:00 - 17:30', 
        goldenHourReason: 'Nắng chiều chiếu rực lên mặt kính màu.',
        travelNotes: ['Ngồi trà chanh vỉa hè là văn hóa đặc trưng ở đây.', 'Khi vào lễ nên giữ im lặng.', 'Khu vực này rất đông đúc vào dịp Giáng sinh.'],
        nearbyRestaurants: [{ name: 'Trà chanh Nhà Thờ', dish: 'Trà chanh', rating: 4.6 }], 
        nearbyAttractions: [{ name: 'Phố Lý Quốc Sư', distance: '0.1km', significance: 'Phố ẩm thực nổi tiếng với món bánh gối và cháo sườn.' }] 
      },
      { id: 'hn-5', name: 'Hoàng thành Thăng Long', description: 'Di sản lịch sử nghìn năm.', image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=600', lat: 21.0355, lng: 105.8394, rating: 4.8, category: 'History', goldenHours: '15:00 - 16:30', goldenHourReason: 'Nắng vàng chiếu rọi lên các bức tường gạch cũ.', travelNotes: ['Rất rộng, nên đi giày thể thao.', 'Có tour đêm trải nghiệm rất thú vị.', 'Gửi xe ở khu vực đối diện cổng vào.'], nearbyRestaurants: [{ name: 'Quán Ăn Ngon', dish: 'Bánh xèo', rating: 4.4 }], nearbyAttractions: [{ name: 'Cột cờ Hà Nội', distance: '0.2km', significance: 'Biểu tượng chủ quyền hiên ngang giữa lòng thủ đô.' }] },
      { id: 'hn-6', name: 'Bảo tàng Dân tộc học', description: 'Khám phá văn hóa 54 dân tộc anh em.', image: 'https://images.unsplash.com/photo-1620216447192-d61053df28d8?q=80&w=600', lat: 21.0406, lng: 105.7985, rating: 4.9, category: 'History', goldenHours: '09:00 - 11:00', travelNotes: ['Khu trưng bày ngoài trời rất đẹp để chụp ảnh.', 'Thích hợp cho gia đình có trẻ em.', 'Thường xuyên có biểu diễn múa rối nước.'], nearbyRestaurants: [{ name: 'Vua Chả Cá', dish: 'Chả cá', rating: 4.6 }], nearbyAttractions: [{ name: 'Công viên Nghĩa Đô', distance: '0.5km', significance: 'Lá phổi xanh của khu vực Cầu Giấy.' }] },
      { id: 'hn-7', name: 'Chùa Trấn Quốc', description: 'Chùa cổ nhất Hà Nội nằm trên một bán đảo nhỏ của Hồ Tây.', image: 'https://images.unsplash.com/photo-1582236171542-f04b122e9603?q=80&w=600', lat: 21.0478, lng: 105.8368, rating: 4.8, category: 'History', goldenHours: '17:30 - 18:30', travelNotes: ['Đi chùa nên mặc kín đáo.', 'Đón hoàng hôn Hồ Tây từ đây là trải nghiệm tuyệt vời nhất.', 'Tránh đi vào mùng 1 hoặc ngày rằm nếu không muốn đông đúc.'], nearbyRestaurants: [{ name: 'Bánh tôm Thanh Mai', dish: 'Bánh tôm', rating: 4.3 }], nearbyAttractions: [{ name: 'Đường Thanh Niên', distance: '0.1km', significance: 'Con đường lãng mạn nhất Hà Nội ngăn cách Hồ Tây và Hồ Trúc Bạch.' }] },
      { id: 'hn-8', name: 'Nhà hát Lớn', description: 'Kiến trúc Pháp cổ điển giữa quảng trường Cách mạng Tháng Tám.', image: 'https://images.unsplash.com/photo-1599708153386-62e2d062860a?q=80&w=600', lat: 21.0242, lng: 105.8576, rating: 4.7, category: 'History', goldenHours: '19:00 - 20:30', travelNotes: ['Thường xuyên có các chương trình nghệ thuật cao cấp.', 'Buổi tối là nơi check-in cực đẹp khi lên đèn.', 'Cẩn thận khi qua đường ở vòng xuyến trước nhà hát.'], nearbyRestaurants: [{ name: 'Press Club', dish: 'Ẩm thực Pháp', rating: 4.5 }], nearbyAttractions: [{ name: 'Khách sạn Metropole', distance: '0.2km', significance: 'Khách sạn lịch sử sang trọng nhất Việt Nam.' }] }
    ]
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    region: Region.NORTH,
    lat: 22.3364,
    lng: 103.8438,
    zoom: 13,
    description: 'Thị trấn trong mây hùng vĩ với ruộng bậc thang và đỉnh Fansipan.',
    image: 'https://images.unsplash.com/photo-1504457047772-27fb181ccc43?q=80&w=800',
    rating: 4.9,
    bestTime: 'Tháng 3 - Tháng 5',
    specialties: ['Cá hồi', 'Lợn cắp nách'],
    attractions: [
      { id: 'sp-1', name: 'Đỉnh Fansipan', description: 'Nóc nhà Đông Dương.', image: 'https://images.unsplash.com/photo-1581060144944-88981977799d?q=80&w=600', lat: 22.3033, lng: 103.7750, rating: 5.0, category: 'Nature', goldenHours: '06:00 - 08:00', travelNotes: ['Chuẩn bị áo khoác dày vì trên đỉnh rất lạnh.', 'Cần mang theo thuốc xịt mũi nếu bạn nhạy cảm với độ cao.', 'Nên mua vé cáp treo trước để tránh hàng chờ dài.'], nearbyRestaurants: [{ name: 'Fansipan Legend', dish: 'Lẩu cá', rating: 4.5 }], nearbyAttractions: [{ name: 'Chùa Kim Sơn', distance: '0.1km', significance: 'Quần thể tâm linh linh thiêng tọa lạc tại đỉnh cao nhất Việt Nam.' }] },
      { id: 'sp-2', name: 'Bản Cát Cát', description: 'Làng cổ người Mông.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600', lat: 22.3283, lng: 103.8317, rating: 4.7, category: 'History', goldenHours: '15:00 - 17:00', travelNotes: ['Đoạn đường bộ khá dốc, nên thuê trang phục dân tộc để chụp ảnh.', 'Tránh cho tiền trẻ em trực tiếp để khuyến khích các em đi học.', 'Kiểm tra kỹ tình hình thời tiết trước khi đi bộ sâu vào bản.'], nearbyRestaurants: [{ name: 'The Haven', dish: 'Coffee', rating: 4.8 }], nearbyAttractions: [{ name: 'Thác Tiên Sa', distance: '0.2km', significance: 'Dòng thác thơ mộng gắn liền với truyền thuyết các nàng tiên giáng trần.' }] },
      { id: 'sp-3', name: 'Nhà thờ Đá', description: 'Biểu tượng Sa Pa.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600', lat: 22.3347, lng: 103.8415, rating: 4.6, category: 'History', goldenHours: '19:00 - 20:30', travelNotes: ['Nơi tập trung chợ tình vào tối thứ 7.', 'Cẩn thận móc túi tại khu vực quảng trường.', 'Giữ im lặng và trang nghiêm khi tham quan bên trong.'], nearbyRestaurants: [{ name: 'A Phủ', dish: 'Thắng cố', rating: 4.4 }], nearbyAttractions: [{ name: 'Chợ tình', distance: '0.1km', significance: 'Nét văn hóa kết duyên độc đáo của đồng bào vùng cao.' }] },
      { id: 'sp-4', name: 'Thung lũng Mường Hoa', description: 'Ruộng bậc thang kỳ vĩ.', image: 'https://images.unsplash.com/photo-1504457047772-27fb181ccc43?q=80&w=600', lat: 22.3025, lng: 103.8752, rating: 4.8, category: 'Nature', goldenHours: '16:30 - 17:30', travelNotes: ['Nên đi trekking để cảm nhận hết vẻ đẹp.', 'Mùa lúa chín vào khoảng tháng 9.', 'Nên thuê hướng dẫn viên bản địa để nghe kể về bãi đá cổ.'], nearbyRestaurants: [{ name: 'Lá Đỏ', dish: 'Cơm lam', rating: 4.5 }], nearbyAttractions: [{ name: 'Suối Mường Hoa', distance: '0.3km', significance: 'Con suối như dải lụa mềm mại vắt ngang qua những cánh đồng lúa bậc thang.' }] },
      { id: 'sp-5', name: 'Thác Bạc', description: 'Dòng thác trắng xóa hùng vĩ đổ xuống từ độ cao hơn 200m.', image: 'https://images.unsplash.com/photo-1581060144944-88981977799d?q=80&w=600', lat: 22.3582, lng: 103.7801, rating: 4.5, category: 'Nature', travelNotes: ['Bậc thang lên thác khá trơn trượt.', 'Khu vực này có nuôi rất nhiều cá hồi Sa Pa.', 'Có nhiều quán nướng chân thác rất ngon.'], nearbyRestaurants: [{ name: 'Song Nhi', dish: 'Gỏi cá hồi', rating: 4.6 }], nearbyAttractions: [{ name: 'Đèo Ô Quy Hồ', distance: '5km', significance: 'Một trong tứ đại đỉnh đèo của vùng núi phía Bắc Việt Nam.' }] },
      { id: 'sp-6', name: 'Núi Hàm Rồng', description: 'Vườn sinh thái với đa dạng loài hoa.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600', lat: 22.3385, lng: 103.8465, rating: 4.6, category: 'Nature', travelNotes: ['Leo lên Sân Mây để nhìn toàn cảnh thị trấn Sa Pa.', 'Càng lên cao bậc đá càng hẹp và dốc.', 'Có các show biểu diễn văn nghệ dân tộc miễn phí.'], nearbyRestaurants: [{ name: 'Quán Liên', dish: 'Bún chả', rating: 4.2 }], nearbyAttractions: [{ name: 'Vườn Đá', distance: '0.1km', significance: 'Khu vực với những phiến đá tự nhiên hình thù kỳ dị tựa như đầu rồng.' }] },
      { id: 'sp-7', name: 'Bản Tả Phìn', description: 'Nổi tiếng tắm lá thuốc của người Dao đỏ.', image: 'https://images.unsplash.com/photo-1504457047772-27fb181ccc43?q=80&w=600', lat: 22.3789, lng: 103.8795, rating: 4.7, category: 'History', travelNotes: ['Trải nghiệm tắm thuốc tại đây là thật nhất.', 'Hang Tả Phìn khá tối, nên đi cùng hướng dẫn viên.', 'Nên mặc cả khi mua thổ cẩm tại bản.'], nearbyRestaurants: [{ name: 'Sapa Hill', dish: 'Gà đen', rating: 4.4 }], nearbyAttractions: [{ name: 'Hang Tả Phìn', distance: '0.5km', significance: 'Hang động tự nhiên sâu hun hút với nhiều nhũ đá tuyệt đẹp.' }] },
      { id: 'sp-8', name: 'Ô Quy Hồ', description: 'Đỉnh đèo huyền thoại ngắm hoàng hôn rực rỡ.', image: 'https://images.unsplash.com/photo-1581060144944-88981977799d?q=80&w=600', lat: 22.3551, lng: 103.7584, rating: 4.9, category: 'Nature', travelNotes: ['Nhiệt độ giảm rất nhanh khi mặt trời lặn.', 'Đường đèo có nhiều khúc cua nguy hiểm, cần vững tay lái.', 'Tránh dừng xe ở những đoạn cua khuất tầm nhìn.'], nearbyRestaurants: [{ name: 'Cổng Trời', dish: 'Nướng', rating: 4.7 }], nearbyAttractions: [{ name: 'Thác Tình Yêu', distance: '2km', significance: 'Ngọn thác ẩn mình trong rừng sâu với câu chuyện tình lãng mạn.' }] }
    ]
  },
  {
    id: 'halong',
    name: 'Hạ Long',
    region: Region.NORTH,
    lat: 20.9501,
    lng: 107.0733,
    zoom: 12,
    description: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.',
    image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=800',
    rating: 4.9,
    bestTime: 'Tháng 4 - Tháng 10',
    specialties: ['Chả mực', 'Hải sản'],
    attractions: [
      { id: 'hl-1', name: 'Vịnh Hạ Long', description: 'Di sản thiên nhiên thế giới.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.9101, lng: 107.1833, rating: 5.0, category: 'Nature', travelNotes: ['Nên đặt tour du thuyền ngủ đêm để trải nghiệm trọn vẹn.', 'Mang theo kem chống nắng và mũ.', 'Hạn chế mang theo đồ nhựa dùng một lần lên vịnh.'], nearbyRestaurants: [{ name: 'Cua Vàng', dish: 'Lẩu cua', rating: 4.7 }], nearbyAttractions: [{ name: 'Hang Luồn', distance: '1km', significance: 'Địa điểm chèo Kayak xuyên qua hang động lộ thiên đẹp nhất vịnh.' }] },
      { id: 'hl-2', name: 'Đảo Ti Tốp', description: 'Bãi tắm vầng trăng.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.8492, lng: 107.0811, rating: 4.8, category: 'Nature', travelNotes: ['Leo hơn 400 bậc đá để lên đỉnh ngắm toàn cảnh vịnh.', 'Bãi tắm nước rất trong nhưng diện tích nhỏ.', 'Tránh đi vào cuối tuần vì đảo thường bị quá tải.'], nearbyRestaurants: [{ name: 'Nhà hàng nổi', dish: 'Hải sản', rating: 4.2 }], nearbyAttractions: [{ name: 'Hang Sửng Sốt', distance: '2km', significance: 'Hang động rộng lớn và lộng lẫy bậc nhất Hạ Long.' }] },
      { id: 'hl-3', name: 'Hang Sửng Sốt', description: 'Hang đẹp nhất vịnh.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.8458, lng: 107.0905, rating: 4.9, category: 'Nature', travelNotes: ['Lối đi trong hang khá trơn, nên mang giày có độ bám tốt.', 'Hang rất rộng, nên đi theo đoàn để không bị lạc.', 'Bên trong hang mát mẻ nhưng độ ẩm khá cao.'], nearbyRestaurants: [{ name: 'Gia đình ngư dân', dish: 'Mực hấp', rating: 4.4 }], nearbyAttractions: [{ name: 'Hang Bồ Nâu', distance: '0.5km', significance: 'Cửa hang có hình thù như miệng một con quái vật biển khổng lồ.' }] },
      { id: 'hl-4', name: 'Bảo tàng Quảng Ninh', description: 'Viên ngọc đen bên bờ vịnh.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.9492, lng: 107.0965, rating: 4.8, category: 'History', travelNotes: ['Bên trong trưng bày rất nhiều mô hình khai thác than.', 'Là điểm check-in cực hot nhờ lớp kính đen phản chiếu.', 'Mở cửa từ thứ 3 đến Chủ Nhật hàng tuần.'], nearbyRestaurants: [{ name: 'Hồng Hạnh 3', dish: 'Hải sản', rating: 4.6 }], nearbyAttractions: [{ name: 'Cung Cá Heo', distance: '0.2km', significance: 'Trung tâm hội chợ triển lãm có kiến trúc hình chú cá heo đang vờn sóng.' }] },
      { id: 'hl-5', name: 'Sun World', description: 'Tổ hợp vui chơi hiện đại.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.9575, lng: 107.0375, rating: 4.7, category: 'Entertainment', travelNotes: ['Cáp treo Nữ Hoàng đạt kỷ lục thế giới về sức chứa.', 'Công viên nước mở cửa theo mùa.', 'Nên mua vé theo combo để tiết kiệm chi phí.'], nearbyRestaurants: [{ name: 'Phố Bãi Cháy', dish: 'Sam biển', rating: 4.5 }], nearbyAttractions: [{ name: 'Cầu Bãi Cháy', distance: '1km', significance: 'Cây cầu dây văng một mặt phẳng dây hiện đại nối liền Hòn Gai và Bãi Cháy.' }] },
      { id: 'hl-6', name: 'Tuần Châu', description: 'Đảo du lịch cao cấp.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.9325, lng: 107.0125, rating: 4.6, category: 'Entertainment', travelNotes: ['Nơi xuất phát của hầu hết du thuyền 5 sao.', 'Buổi tối có show diễn xiếc cá heo và nhạc nước.', 'Có bãi tắm nhân tạo sạch và rộng nhất Hạ Long.'], nearbyRestaurants: [{ name: '1958 Restaurant', dish: 'Hải sản', rating: 4.4 }], nearbyAttractions: [{ name: 'Cảng Tuần Châu', distance: '0.5km', significance: 'Cảng tàu nhân tạo lớn nhất Việt Nam phục vụ khách du lịch vịnh.' }] },
      { id: 'hl-7', name: 'Núi Bài Thơ', description: 'Di tích lịch sử.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.9525, lng: 107.0825, rating: 4.7, category: 'History', travelNotes: ['Hiện tại lối lên chính đang bị đóng, hãy hỏi người dân địa phương.', 'Có tầm nhìn ngoạn mục ra toàn bộ vịnh và thành phố.', 'Nên leo núi vào sáng sớm để tránh nắng gắt.'], nearbyRestaurants: [{ name: 'Phở Hòn Gai', dish: 'Phở hải sản', rating: 4.3 }], nearbyAttractions: [{ name: 'Chùa Long Tiên', distance: '0.3km', significance: 'Ngôi chùa cổ dưới chân núi Bài Thơ với kiến trúc mái đao cong vút.' }] },
      { id: 'hl-8', name: 'Động Thiên Cung', description: 'Hang động lung linh như cung điện của trời.', image: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=600', lat: 20.9158, lng: 107.0215, rating: 4.8, category: 'Nature', travelNotes: ['Thường nằm trong tour vịnh tuyến 1 (4 tiếng).', 'Hang động có nhiều nhũ đá sắc sảo, không nên chạm vào.', 'Nên mang theo đèn pin nếu muốn khám phá các góc tối.'], nearbyRestaurants: [{ name: 'Nhà hàng Tuần Châu', dish: 'Hàu nướng', rating: 4.2 }], nearbyAttractions: [{ name: 'Hang Đầu Gỗ', distance: '0.1km', significance: 'Hang động gắn liền với cuộc kháng chiến chống quân Nguyên Mông của Trần Hưng Đạo.' }] }
    ]
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    region: Region.CENTRAL,
    lat: 16.0544,
    lng: 108.2022,
    zoom: 12,
    description: 'Thành phố đáng sống nhất Việt Nam với những cây cầu huyền thoại.',
    image: 'https://images.unsplash.com/photo-1559592443-7f87a79f6cae?q=80&w=800',
    rating: 4.8,
    bestTime: 'Tháng 2 - Tháng 8',
    specialties: ['Mì Quảng', 'Bánh tráng thịt heo'],
    attractions: [
      { id: 'dn-1', name: 'Cầu Rồng', description: 'Biểu tượng thịnh vượng của thành phố.', image: 'https://images.unsplash.com/photo-1582236171542-f04b122e9603?q=80&w=600', lat: 16.0611, lng: 108.2272, rating: 4.9, category: 'Entertainment', travelNotes: ['Phun lửa và nước vào 21:00 tối thứ 7 và Chủ Nhật.', 'Đứng trên cầu lúc phun lửa sẽ hơi nóng.', 'Đoạn đường Trần Hưng Đạo sẽ bị cấm xe khi cầu phun lửa.'], nearbyRestaurants: [{ name: 'Cardamom', dish: 'Mì Quảng', rating: 4.5 }], nearbyAttractions: [{ name: 'Cầu Tình Yêu', distance: '0.2km', significance: 'Nơi các cặp đôi treo ổ khóa để minh chứng cho tình yêu bền chặt.' }] },
      { id: 'dn-2', name: 'Bà Nà Hills', description: 'Đường lên tiên cảnh với Cầu Vàng nổi danh thế giới.', image: 'https://images.unsplash.com/photo-1531737212413-667205e1cda7?q=80&w=600', lat: 15.9951, lng: 107.9968, rating: 5.0, category: 'Entertainment', travelNotes: ['Cần cả ngày để khám phá hết.', 'Nên đặt vé trước để tránh xếp hàng dài.', 'Thời tiết trên đỉnh núi thay đổi liên tục, nên mang theo áo khoác mỏng.'], nearbyRestaurants: [{ name: 'Arapang', dish: 'Buffet', rating: 4.4 }], nearbyAttractions: [{ name: 'Làng Pháp', distance: '0.2km', significance: 'Không gian kiến trúc cổ điển thu nhỏ của nước Pháp giữa lòng Đà Nẵng.' }] },
      { id: 'dn-3', name: 'Sơn Trà', description: 'Bán đảo xanh với chùa Linh Ứng và tượng Phật Bà cao nhất VN.', image: 'https://images.unsplash.com/photo-1559592443-7f87a79f6cae?q=80&w=800', lat: 16.1205, lng: 108.2785, rating: 4.8, category: 'Nature', travelNotes: ['Đường lên bán đảo có nhiều đoạn dốc, cần chú ý an toàn.', 'Không nên cho voọc chà vá ăn để bảo tồn tự nhiên.', 'Nên đi bằng xe số thay vì xe ga để đảm bảo an toàn khi xuống dốc.'], nearbyRestaurants: [{ name: 'Năm Đảnh', dish: 'Hải sản', rating: 4.7 }], nearbyAttractions: [{ name: 'Cây đa nghìn năm', distance: '2km', significance: 'Thực thể sống khổng lồ có tuổi thọ lên đến hơn 10 thế kỷ.' }] },
      { id: 'dn-4', name: 'Ngũ Hành Sơn', description: '5 ngọn núi đại diện cho Kim, Mộc, Thủy, Hỏa, Thổ.', image: 'https://images.unsplash.com/photo-1559592443-7f87a79f6cae?q=80&w=600', lat: 16.0028, lng: 108.2635, rating: 4.7, category: 'Nature', travelNotes: ['Có thang máy lên núi cho người cao tuổi.', 'Khu vực Động Huyền Không rất đẹp khi có nắng chiếu từ trên đỉnh.', 'Nên đi giày thể thao để leo các hang động gồ ghề.'], nearbyRestaurants: [{ name: 'Mì Quảng Ếch', dish: 'Mì quảng', rating: 4.5 }], nearbyAttractions: [{ name: 'Làng Non Nước', distance: '0.1km', significance: 'Làng nghề điêu khắc đá mỹ nghệ nổi tiếng có lịch sử hơn 300 năm.' }] },
      { id: 'dn-5', name: 'Biển Mỹ Khê', description: 'Một trong sáu bãi biển quyến rũ nhất hành tinh.', image: 'https://images.unsplash.com/photo-1559592443-7f87a79f6cae?q=80&w=600', lat: 16.0645, lng: 108.2452, rating: 4.9, category: 'Nature', travelNotes: ['Chỉ tắm ở khu vực có cứu hộ.', 'Dịch vụ ở đây khá minh bạch, hiếm khi có tình trạng chèo kéo.', 'Gửi đồ và tắm nước ngọt có niêm yết giá rõ ràng.'], nearbyRestaurants: [{ name: 'Hải sản Bé Mặn', dish: 'Hải sản', rating: 4.6 }], nearbyAttractions: [{ name: 'Công viên Biển Đông', distance: '0.5km', significance: 'Nơi tập trung hàng nghìn chú chim bồ câu thân thiện.' }] },
      { id: 'dn-6', name: 'Cầu Tình Yêu', description: 'Điểm check-in lãng mạn cạnh sông Hàn.', image: 'https://images.unsplash.com/photo-1582236171542-f04b122e9603?q=80&w=600', lat: 16.0615, lng: 108.2315, rating: 4.6, category: 'Entertainment', travelNotes: ['Thích hợp đi vào buổi tối khi đèn lồng cá chép tỏa sáng.', 'Cẩn thận đồ đạc vì đây là điểm check-in rất đông du khách.', 'Khóa tình yêu có bán sẵn ngay quầy gần đó.'], nearbyRestaurants: [{ name: 'Bà Dưỡng', dish: 'Bánh xèo', rating: 4.8 }], nearbyAttractions: [{ name: 'Tượng Cá Chép', distance: '0.05km', significance: 'Biểu tượng Cá chép hóa Rồng thể hiện khát vọng vươn xa của người Đà Nẵng.' }] },
      { id: 'dn-7', name: 'Asia Park', description: 'Công viên giải trí với vòng quay Sun Wheel.', image: 'https://images.unsplash.com/photo-1531737212413-667205e1cda7?q=80&w=600', lat: 16.0405, lng: 108.2255, rating: 4.6, category: 'Entertainment', travelNotes: ['Nên đi sau 16:00 khi trời đã mát.', 'Vòng quay Sun Wheel ngắm cảnh toàn thành phố rất đẹp.', 'Có nhiều góc chụp ảnh phong cách châu Á độc đáo.'], nearbyRestaurants: [{ name: 'Indochine', dish: 'Buffet', rating: 4.4 }], nearbyAttractions: [{ name: 'Lotte Mart', distance: '0.5km', significance: 'Trung tâm mua sắm sầm uất cho du khách mua quà đặc sản.' }] },
      { id: 'dn-8', name: 'Chợ Hàn', description: 'Khu chợ truyền thống sầm uất bậc nhất.', image: 'https://images.unsplash.com/photo-1559592443-7f87a79f6cae?q=80&w=800', lat: 16.0682, lng: 108.2245, rating: 4.5, category: 'Food', travelNotes: ['Cần mặc cả một chút khi mua đồ lưu niệm.', 'Nổi tiếng với mắm các loại và hải sản khô.', 'Hãy mua hạt điều và mực một nắng tại các quầy uy tín.'], nearbyRestaurants: [{ name: 'Bún chả cá Ông Tạ', dish: 'Bún cá', rating: 4.7 }], nearbyAttractions: [{ name: 'Nhà thờ Con Gà', distance: '0.3km', significance: 'Nhà thờ cổ duy nhất được xây dựng từ thời Pháp thuộc tại Đà Nẵng.' }] }
    ]
  },
  {
    id: 'hoian',
    name: 'Hội An',
    region: Region.CENTRAL,
    lat: 15.8801,
    lng: 108.3273,
    zoom: 14,
    description: 'Thương cảng cổ rực rỡ đèn lồng với những nếp nhà vàng đặc trưng.',
    image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=800',
    rating: 4.9,
    bestTime: 'Tháng 2 - Tháng 4',
    specialties: ['Cao lầu', 'Cơm gà'],
    attractions: [
      { id: 'ha-1', name: 'Chùa Cầu', description: 'Linh hồn của phố cổ Hội An.', image: 'https://images.unsplash.com/photo-1616484173745-07f25fd0547f?q=80&w=600', lat: 15.8771, lng: 108.3259, rating: 4.8, category: 'History', travelNotes: ['Nên mua vé tham quan để góp phần bảo tồn di tích.', 'Tránh mặc đồ quá hở hang khi bước vào khu vực thờ tự.', 'Không được tự ý chạm vào các cấu trúc gỗ cổ.'], nearbyRestaurants: [{ name: 'Bánh mì Phượng', dish: 'Bánh mì', rating: 4.9 }], nearbyAttractions: [{ name: 'Nhà cổ Tân Ký', distance: '0.1km', significance: 'Ngôi nhà cổ hơn 200 năm với kiến trúc giao thoa Việt - Nhật - Trung.' }] },
      { id: 'ha-2', name: 'Nhà cổ Tân Ký', description: 'Kiến trúc cổ điển của thương gia xưa.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.8775, lng: 108.3275, rating: 4.7, category: 'History', travelNotes: ['Hãy lắng nghe thuyết minh để hiểu về ý nghĩa các hoa văn.', 'Không gian bên trong khá hẹp, nên di chuyển nhẹ nhàng.', 'Cẩn thận với các hiện vật trưng bày.'], nearbyRestaurants: [{ name: 'Morning Glory', dish: 'Cao lầu', rating: 4.6 }], nearbyAttractions: [{ name: 'Hội quán Phúc Kiến', distance: '0.2km', significance: 'Nơi thờ Thiên Hậu Thánh Mẫu và là điểm tụ họp của cộng đồng người Hoa.' }] },
      { id: 'ha-3', name: 'Hội quán Phúc Kiến', description: 'Kiến trúc Trung Hoa tinh xảo.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.8778, lng: 108.3298, rating: 4.8, category: 'History', travelNotes: ['Có thể thắp nhang vòng mong cầu bình an cho gia đình.', 'Mỗi vòng nhang có thể cháy liên tục trong nhiều ngày.', 'Giữ yên lặng khi vào khu vực hành lễ.'], nearbyRestaurants: [{ name: 'Cơm gà Bà Buội', dish: 'Cơm gà', rating: 4.7 }], nearbyAttractions: [{ name: 'Chợ Hội An', distance: '0.4km', significance: 'Khu chợ giàu bản sắc với những món ăn đường phố ngon tuyệt.' }] },
      { id: 'ha-4', name: 'Chợ Hội An', description: 'Thiên đường ẩm thực bản địa.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.8785, lng: 108.3325, rating: 4.6, category: 'Food', travelNotes: ['Nên thử chè bắp và bánh vạc tại đây.', 'Khu vực ẩm thực tập trung ở giữa chợ.', 'Giá cả ở đây thường rẻ hơn so với các nhà hàng mặt phố.'], nearbyRestaurants: [{ name: 'Cao lầu Thanh', dish: 'Cao lầu', rating: 4.8 }], nearbyAttractions: [{ name: 'Sông Hoài', distance: '0.1km', significance: 'Dòng sông thơ mộng nơi du khách có thể thả hoa đăng vào ngày rằm.' }] },
      { id: 'ha-5', name: 'Rừng dừa Bảy Mẫu', description: 'Trải nghiệm ngồi thúng trên sông.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.8752, lng: 108.3755, rating: 4.7, category: 'Nature', travelNotes: ['Nên mang theo kính mát và chuẩn bị tiền tip nhỏ cho người chèo thúng.', 'Trò chơi quay thúng có thể gây chóng mặt cho người nhạy cảm.', 'Hãy đảm bảo mặc áo phao suốt hành trình trên thúng.'], nearbyRestaurants: [{ name: 'Nhà hàng Bến Tre', dish: 'Cơm dừa', rating: 4.3 }], nearbyAttractions: [{ name: 'Biển Cửa Đại', distance: '2km', significance: 'Bãi biển cát trắng mịn màng nơi sông Thu Bồn đổ ra biển lớn.' }] },
      { id: 'ha-6', name: 'Biển An Bàng', description: 'Bãi biển bình yên nhất thế giới.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.9125, lng: 108.3552, rating: 4.8, category: 'Nature', travelNotes: ['Nơi đây tập trung nhiều homestay phong cách rất chill.', 'Bãi biển sạch, sóng êm, thích hợp tắm vào chiều mát.', 'Có nhiều quán bar ven biển với không gian thư giãn tuyệt vời.'], nearbyRestaurants: [{ name: 'The Deck House', dish: 'Pizza', rating: 4.6 }], nearbyAttractions: [{ name: 'Biển Cửa Đại', distance: '2km', significance: 'Vùng biển thanh bình gắn liền với cuộc sống làng chài.' }] },
      { id: 'ha-7', name: 'Làng gốm Thanh Hà', description: 'Làng nghề gốm đất nung truyền thống.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.8855, lng: 108.2955, rating: 4.5, category: 'History', travelNotes: ['Bạn có thể tự tay nhào nặn một sản phẩm gốm cho riêng mình.', 'Hãy thử trải nghiệm bàn xoay gốm thủ công.', 'Mua các món quà gốm nhỏ xinh làm kỷ niệm.'], nearbyRestaurants: [{ name: 'Gốm Việt', dish: 'Trà thảo mộc', rating: 4.2 }], nearbyAttractions: [{ name: 'Công viên Đất nung', distance: '0.1km', significance: 'Bảo tàng gốm ngoài trời độc đáo nhất miền Trung.' }] },
      { id: 'ha-8', name: 'VinWonders', description: 'Vui chơi giải trí thực cảnh.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 15.8255, lng: 108.3555, rating: 4.8, category: 'Entertainment', travelNotes: ['Đừng bỏ lỡ show diễn thực cảnh Về Bến.', 'Công viên rất rộng, nên thuê xe điện để di chuyển.', 'Khu vực River Safari ngắm thú từ thuyền rất thú vị.'], nearbyRestaurants: [{ name: 'Safari Restaurant', dish: 'Buffet', rating: 4.5 }], nearbyAttractions: [{ name: 'River Safari', distance: '0.2km', significance: 'Sở thú trên sông duy nhất tại Việt Nam.' }] }
    ]
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    region: Region.CENTRAL,
    lat: 12.2388,
    lng: 109.1967,
    zoom: 13,
    description: 'Vịnh biển đẹp bậc nhất với các hòn đảo hoang sơ và đặc sản nem nướng.',
    image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=800',
    rating: 4.8,
    bestTime: 'Tháng 1 - Tháng 9',
    specialties: ['Bún sứa', 'Nem nướng'],
    attractions: [
      { id: 'nt-1', name: 'Tháp Bà Ponagar', description: 'Quần thể tháp Chăm cổ.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2655, lng: 109.1958, rating: 4.9, category: 'History', travelNotes: ['Mượn áo dài miễn phí tại cổng nếu mặc đồ ngắn.', 'Có biểu diễn múa Chăm vào khung giờ cố định.', 'Nên đi vào sáng sớm để tránh đoàn khách đông.'], nearbyRestaurants: [{ name: 'Bún cá Cô Ba', dish: 'Bún sứa', rating: 4.7 }], nearbyAttractions: [{ name: 'Suối khoáng I-resort', distance: '2km', significance: 'Khu nghỉ dưỡng tắm bùn khoáng nóng trứ danh.' }] },
      { id: 'nt-2', name: 'VinWonders', description: 'Đảo hòn Tre - Thiên đường vui chơi.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2155, lng: 109.2355, rating: 5.0, category: 'Entertainment', travelNotes: ['Nên đi cáp treo lượt về buổi tối để ngắm thành phố.', 'Mang theo kem chống nắng vì các khu trò chơi ngoài trời khá nắng.', 'Chuẩn bị đồ bơi cho khu vực công viên nước.'], nearbyRestaurants: [{ name: 'Imperial Club', dish: 'Dimsum', rating: 4.6 }], nearbyAttractions: [{ name: 'Vịnh Nha Trang', distance: '0.1km', significance: 'Một trong những vịnh biển đẹp nhất thế giới.' }] },
      { id: 'nt-3', name: 'Chùa Long Sơn', description: 'Tượng Phật trắng khổng lồ nhìn xuống thành phố.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2505, lng: 109.1815, rating: 4.7, category: 'History', travelNotes: ['Leo gần 200 bậc thang để lên tới đỉnh tượng.', 'Cảnh báo về các "hướng dẫn viên tự xưng" ép mua nhang.', 'Ăn mặc lịch sự khi bước vào khuôn viên chùa.'], nearbyRestaurants: [{ name: 'Quán chay', dish: 'Cơm chay', rating: 4.5 }], nearbyAttractions: [{ name: 'Chợ Đầm', distance: '1.5km', significance: 'Ngôi chợ có kiến trúc hình bông sen, trung tâm giao thương chính của tỉnh.' }] },
      { id: 'nt-4', name: 'Viện Hải dương học', description: 'Khám phá thế giới dưới lòng đại dương.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2015, lng: 109.2155, rating: 4.7, category: 'Nature', travelNotes: ['Nơi trưng bày bộ xương cá voi khổng lồ.', 'Thích hợp cho trẻ em tìm hiểu về biển đảo.', 'Có khu vực bể nuôi ngoài trời rất sống động.'], nearbyRestaurants: [{ name: 'Thanh Sương', dish: 'Tôm hùm', rating: 4.4 }], nearbyAttractions: [{ name: 'Cảng Nha Trang', distance: '0.5km', significance: 'Đầu mối giao thông đường biển quan trọng của miền Nam Trung Bộ.' }] },
      { id: 'nt-5', name: 'Đảo Hòn Tre', description: 'Đảo lớn nhất vịnh Nha Trang.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=800', lat: 12.2055, lng: 109.2555, rating: 4.8, category: 'Nature', travelNotes: ['Sở hữu nhiều bãi tắm riêng tư tuyệt đẹp.', 'Có thể di chuyển bằng tàu cao tốc hoặc cáp treo.', 'Các khu nghỉ dưỡng ở đây mang tiêu chuẩn quốc tế.'], nearbyRestaurants: [{ name: 'Lagoon Restaurant', dish: 'Hải sản', rating: 4.5 }], nearbyAttractions: [{ name: 'Bãi Trũ', distance: '0.2km', significance: 'Bãi biển hiền hòa với dải cát trắng mịn bao quanh chân đảo.' }] },
      { id: 'nt-6', name: 'Hòn Chồng', description: 'Sự sắp xếp kỳ thú của những khối đá tự nhiên.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2715, lng: 109.2055, rating: 4.6, category: 'Nature', travelNotes: ['Điểm ngắm hoàng hôn vịnh tuyệt nhất.', 'Hãy cẩn thận khi bước lên những mỏm đá sát biển.', 'Có không gian cà phê ngắm biển rất thư giãn.'], nearbyRestaurants: [{ name: 'Đặng Văn Quyên', dish: 'Nem nướng', rating: 4.7 }], nearbyAttractions: [{ name: 'Hòn Đỏ', distance: '0.5km', significance: 'Hòn đảo nhỏ có ngôi chùa cổ linh thiêng giữa biển.' }] },
      { id: 'nt-7', name: 'Chợ Đầm', description: 'Biểu tượng thương mại Nha Trang.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2515, lng: 109.1915, rating: 4.5, category: 'Food', travelNotes: ['Hãy cẩn thận bảo quản ví tiền.', 'Nơi mua mực rim, cá khô lý tưởng nhất.', 'Cần trả giá khi mua các mặt hàng lưu niệm.'], nearbyRestaurants: [{ name: 'Bún cá Ông Ninh', dish: 'Bún sứa', rating: 4.7 }], nearbyAttractions: [{ name: 'Nhà thờ Núi', distance: '1km', significance: 'Kiến trúc Gothic Pháp bằng đá uy nghiêm nằm trên đỉnh đồi.' }] },
      { id: 'nt-8', name: 'Nhà thờ Núi', description: 'Kiến trúc Gothic cổ điển.', image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600', lat: 12.2465, lng: 109.1885, rating: 4.6, category: 'History', travelNotes: ['Giữ im lặng khi vào tham quan.', 'Không được quay phim chụp ảnh trong lúc đang làm lễ.', 'Trang phục trang nghiêm là bắt buộc khi vào điện thờ.'], nearbyRestaurants: [{ name: 'Rain Forest', dish: 'Coffee', rating: 4.8 }], nearbyAttractions: [{ name: 'Ga Nha Trang', distance: '0.3km', significance: 'Một trong những ga tàu đẹp nhất trên tuyến đường sắt Bắc Nam.' }] }
    ]
  },
  {
    id: 'hcmc',
    name: 'TP. Hồ Chí Minh',
    region: Region.SOUTH,
    lat: 10.7769,
    lng: 106.7009,
    zoom: 12,
    description: 'Trung tâm năng động bậc nhất với sự giao thoa văn hóa Đông Tây.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=800',
    rating: 4.7,
    bestTime: 'Tháng 12 - Tháng 3',
    specialties: ['Cơm tấm', 'Bánh mì'],
    attractions: [
      { id: 'hcm-1', name: 'Dinh Độc Lập', description: 'Chứng tích lịch sử quan trọng nhất của Sài Gòn.', image: 'https://images.unsplash.com/photo-1594917631343-855c7096d2e0?q=80&w=600', lat: 10.7769, lng: 106.6953, rating: 4.8, category: 'History', travelNotes: ['Nên xem phim tài liệu bên trong để hiểu rõ lịch sử.', 'Khuôn viên rất mát mẻ cho các gia đình dạo chơi.', 'Vé tham quan chia làm nhiều loại tùy khu vực muốn vào.'], nearbyRestaurants: [{ name: 'Cơm tấm Thuận Kiều', dish: 'Cơm tấm', rating: 4.5 }], nearbyAttractions: [{ name: 'Nhà thờ Đức Bà', distance: '0.5km', significance: 'Kiệt tác kiến trúc gạch đỏ Pháp trường tồn hơn một thế kỷ.' }] },
      { id: 'hcm-2', name: 'Nhà thờ Đức Bà', description: 'Biểu tượng cổ kính của Sài Gòn.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7797, lng: 106.6991, rating: 4.7, category: 'History', travelNotes: ['Hiện đang trong quá trình trùng tu, có thể chỉ ngắm được bên ngoài.', 'Khu vực quảng trường phía trước có nhiều chim bồ câu thân thiện.', 'Cẩn thận khi chụp ảnh vì lưu lượng giao thông quanh nhà thờ rất cao.'], nearbyRestaurants: [{ name: 'Cafe Bưu Điện', dish: 'Cafe sữa đá', rating: 4.6 }], nearbyAttractions: [{ name: 'Bưu điện Thành phố', distance: '0.1km', significance: 'Bưu điện lớn nhất và đẹp nhất Việt Nam do Gustave Eiffel thiết kế.' }] },
      { id: 'hcm-3', name: 'Bưu điện Thành phố', description: 'Kiến trúc Pháp tinh tế.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7799, lng: 106.6999, rating: 4.7, category: 'History', travelNotes: ['Bạn có thể gửi bưu thiếp cho người thân từ đây.', 'Kiến trúc trần nhà dạng vòm rất độc đáo.', 'Có quầy lưu niệm bên trong bán các vật phẩm mang tính biểu tượng.'], nearbyRestaurants: [{ name: 'Pizza 4Ps', dish: 'Pizza', rating: 4.9 }], nearbyAttractions: [{ name: 'Đường sách', distance: '0.05km', significance: 'Không gian tri thức xanh mát, yên bình ngay giữa trung tâm náo nhiệt.' }] },
      { id: 'hcm-4', name: 'Chợ Bến Thành', description: 'Biểu tượng giao thương lâu đời.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7719, lng: 106.6983, rating: 4.6, category: 'Food', travelNotes: ['Hãy mặc cả khi mua đồ thủ công mỹ nghệ.', 'Cần cẩn thận đề phòng móc túi.', 'Sau 7h tối, các khu phố xung quanh chợ sẽ trở thành chợ đêm ẩm thực.'], nearbyRestaurants: [{ name: 'Bếp Mẹ Ỉn', dish: 'Bánh xèo', rating: 4.7 }], nearbyAttractions: [{ name: 'Phố Bùi Viện', distance: '1km', significance: 'Khu phố Tây không ngủ với nhịp sống về đêm sôi động bậc nhất.' }] },
      { id: 'hcm-5', name: 'Bảo tàng Chứng tích Chiến tranh', description: 'Nơi lưu giữ ký ức khốc liệt của chiến tranh Việt Nam.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7795, lng: 106.6922, rating: 4.9, category: 'History', travelNotes: ['Hình ảnh trưng bày có thể khá ám ảnh đối với trẻ nhỏ.', 'Nên dành khoảng 2 tiếng để xem hết các khu vực.', 'Khu vực sân trưng bày máy bay và xe tăng bên ngoài rất thu hút.'], nearbyRestaurants: [{ name: 'Workshop Coffee', dish: 'Coffee', rating: 4.8 }], nearbyAttractions: [{ name: 'Dinh Độc Lập', distance: '0.6km', significance: 'Công trình kiến trúc hiện đại đầu tiên của Việt Nam.' }] },
      { id: 'hcm-6', name: 'Phố đi bộ Nguyễn Huệ', description: 'Quảng trường hiện đại trung tâm quận 1.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7745, lng: 106.7035, rating: 4.8, category: 'Entertainment', travelNotes: ['Vào dịp lễ tết nơi đây rất đông người.', 'Có màn trình diễn nhạc nước định kỳ vào buổi tối.', 'Cẩn thận trượt ngã khi trời mưa vì mặt đá khá trơn.'], nearbyRestaurants: [{ name: 'Chung cư 42', dish: 'Trà sữa', rating: 4.7 }], nearbyAttractions: [{ name: 'UBND TP', distance: '0.1km', significance: 'Tòa nhà cổ kính bậc nhất Sài Gòn với phong cách kiến trúc Pháp.' }] },
      { id: 'hcm-7', name: 'Landmark 81', description: 'Tòa nhà cao nhất Việt Nam.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7951, lng: 106.7218, rating: 4.8, category: 'Entertainment', travelNotes: ['Có rạp chiếu phim và sân trượt băng lớn nhất thành phố.', 'Đài quan sát Skyview ở tầng 79-81 cần mua vé riêng.', 'Khu vực công viên Vinhomes phía sau rất lý tưởng để đi dạo.'], nearbyRestaurants: [{ name: 'Ussina', dish: 'Bò Wagyu', rating: 4.6 }], nearbyAttractions: [{ name: 'Công viên Vinhomes', distance: '0.1km', significance: 'Công viên ven sông Sài Gòn với thảm cỏ xanh rộng lớn.' }] },
      { id: 'hcm-8', name: 'Bitexco Financial Tower', description: 'Tòa tháp biểu tượng hình hoa sen.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600', lat: 10.7715, lng: 106.7045, rating: 4.7, category: 'Entertainment', travelNotes: ['Hãy lên Skydeck tầng 49 để ngắm toàn cảnh Sài Gòn.', 'Tòa tháp này từng là công trình cao nhất thành phố trước khi có Landmark 81.', 'Có khu ẩm thực Food Court đa dạng ở tầng thấp.'], nearbyRestaurants: [{ name: 'EON51', dish: 'Cocktail', rating: 4.5 }], nearbyAttractions: [{ name: 'Sông Sài Gòn', distance: '0.2km', significance: 'Mạch máu quan trọng gắn liền với sự hình thành của thành phố Gia Định xưa.' }] }
    ]
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    region: Region.SOUTH,
    lat: 10.2289,
    lng: 103.9572,
    zoom: 11,
    description: 'Đảo Ngọc xinh đẹp với các khu nghỉ dưỡng đẳng cấp quốc tế.',
    image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=800',
    rating: 4.9,
    bestTime: 'Tháng 11 - Tháng 4',
    specialties: ['Gỏi cá trích', 'Bún quậy'],
    attractions: [
      { id: 'pq-1', name: 'VinWonders & Safari', description: 'Tổ hợp vui chơi lớn nhất Việt Nam.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.3345, lng: 103.8555, rating: 5.0, category: 'Entertainment', travelNotes: ['Nên mang theo đồ bơi cho công viên nước.', 'Safari có khu vực xe bus lồng kính ngắm thú thả tự do rất thú vị.', 'Nên đi sớm để tránh nắng gắt ở khu Safari.'], nearbyRestaurants: [{ name: 'The Giraffe', dish: 'Burger', rating: 4.4 }], nearbyAttractions: [{ name: 'Grand World', distance: '2km', significance: 'Thành phố không ngủ lấy cảm hứng từ phong cách Venice.' }] },
      { id: 'pq-2', name: 'Grand World', description: 'Thiên đường giải trí không ngủ.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.3315, lng: 103.8575, rating: 4.7, category: 'Entertainment', travelNotes: ['Xem show Tinh hoa Việt Nam rất đáng đồng tiền.', 'Có dịch vụ chèo thuyền trên kênh đào kiểu Ý.', 'Phí tham quan các khu vực bảo tàng Gấu Teddy là riêng biệt.'], nearbyRestaurants: [{ name: 'Phố hải sản', dish: 'Ghẹ', rating: 4.5 }], nearbyAttractions: [{ name: 'Gấu Teddy', distance: '0.1km', significance: 'Bảo tàng gấu Teddy thứ 8 trên thế giới.' }] },
      { id: 'pq-3', name: 'Cáp treo Hòn Thơm', description: 'Hệ thống cáp treo 3 dây vượt biển dài nhất thế giới.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 9.9985, lng: 104.0125, rating: 4.9, category: 'Nature', travelNotes: ['Bạn sẽ được nhìn ngắm toàn cảnh các làng chài từ trên cao.', 'Giá vé combo cáp treo đã bao gồm công viên nước Aquatopia.', 'Kiểm tra giờ cáp treo vận hành vì có khung giờ nghỉ trưa.'], nearbyRestaurants: [{ name: 'Buffet Hòn Thơm', dish: 'Hải sản', rating: 4.3 }], nearbyAttractions: [{ name: 'Aquatopia', distance: '0.1km', significance: 'Công viên nước hàng đầu châu Á với nhiều trò chơi cảm giác mạnh.' }] },
      { id: 'pq-4', name: 'Bãi Sao', description: 'Cát trắng như kem sữa.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.0575, lng: 104.0375, rating: 4.8, category: 'Nature', travelNotes: ['Bãi biển này nước rất nông và êm, phù hợp cho trẻ em.', 'Các dịch vụ cho thuê ghế và tắm nước ngọt sẽ tốn phí.', 'Tránh đi vào mùa mưa vì nước có thể bị đục.'], nearbyRestaurants: [{ name: 'Mỹ Lan', dish: 'Gỏi cá trích', rating: 4.4 }], nearbyAttractions: [{ name: 'Mũi Ông Đội', distance: '3km', significance: 'Địa điểm duy nhất trên đảo có thể ngắm mặt trời mọc và lặn cùng một vị trí.' }] },
      { id: 'pq-5', name: 'Chùa Hộ Quốc', description: 'Thiền viện hướng biển tâm linh.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.0875, lng: 104.0555, rating: 4.8, category: 'History', travelNotes: ['Cần ăn mặc kín đáo.', 'Lối lên chùa có tầm nhìn bao quát toàn bộ vùng biển phía Đông đảo.', 'Giữ trật tự khi tham quan bên trong điện thờ.'], nearbyRestaurants: [{ name: 'Trúc Lâm', dish: 'Bún quậy', rating: 4.6 }], nearbyAttractions: [{ name: 'Bãi Khem', distance: '5km', significance: 'Bãi biển hình cánh cung nằm im lìm giữa hai sườn rừng xanh thẳm.' }] },
      { id: 'pq-6', name: 'Nhà tù Phú Quốc', description: 'Địa ngục trần gian - nơi chứng kiến tội ác chiến tranh.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.0455, lng: 104.0175, rating: 4.7, category: 'History', travelNotes: ['Cảnh tượng phục dựng có thể khá ám ảnh.', 'Hãy mang theo nước và mũ vì khuôn viên bên ngoài khá nắng.', 'Cần có thái độ trang nghiêm tôn trọng lịch sử.'], nearbyRestaurants: [{ name: 'Út Lượm', dish: 'Bún kèn', rating: 4.5 }], nearbyAttractions: [{ name: 'Nhà thùng Nước mắm', distance: '1km', significance: 'Nơi sản xuất ra loại gia vị tinh túy đặc sản của Đảo Ngọc.' }] },
      { id: 'pq-7', name: 'Chợ đêm Phú Quốc', description: 'Thiên đường ẩm thực đêm đảo ngọc.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.2175, lng: 103.9575, rating: 4.6, category: 'Food', travelNotes: ['Thưởng thức kẹo chỉ và dừa sáp là đặc trưng ở đây.', 'Cẩn thận với vấn đề vệ sinh an toàn thực phẩm.', 'Nên hỏi giá kỹ trước khi chọn hải sản tươi sống.'], nearbyRestaurants: [{ name: 'Quán Việt', dish: 'Gỏi cá trích', rating: 4.7 }], nearbyAttractions: [{ name: 'Dinh Cậu', distance: '0.5km', significance: 'Biểu tượng tín ngưỡng của dân chài địa phương nằm bên mỏm đá sát biển.' }] },
      { id: 'pq-8', name: 'Sunset Sanato', description: 'Tác phẩm nghệ thuật ven biển cực độc đáo.', image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600', lat: 10.1655, lng: 103.9675, rating: 4.7, category: 'Entertainment', travelNotes: ['Phải mua vé vào cửa.', 'Là điểm ngắm hoàng hôn đẹp nhất Phú Quốc với các tượng voi khổng lồ.', 'Rất đông người xếp hàng chụp ảnh vào lúc 5-6 giờ chiều.'], nearbyRestaurants: [{ name: 'Sunset Cafe', dish: 'Cocktail', rating: 4.4 }], nearbyAttractions: [{ name: 'Bãi Trường', distance: '0.1km', significance: 'Bãi biển dài nhất Phú Quốc với hơn 20km bờ cát.' }] }
    ]
  }
];

export const FOOD_LIST: Food[] = [
  {
    id: 'f1',
    name: 'Phở Bò',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=600',
    description: 'Phở bò Hà Nội thanh cảnh, tinh tế với bánh phở mềm và nước dùng ngọt từ xương.',
    priceRange: '45,000 - 90,000 VND',
    type: 'Street Food',
    tags: ['Hanoi', 'Signature'],
    recommendedPlaces: [
      { name: 'Phở Bát Đàn', address: '49 Bát Đàn, Hà Nội', phone: '024 3828 0124' },
      { name: 'Phở Thìn Lò Đúc', address: '13 Lò Đúc, Hà Nội', phone: '097 508 19 86' }
    ]
  },
  {
    id: 'f_hanoi_bc',
    name: 'Bún Chả Hà Nội',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600',
    description: 'Thịt nướng xém cạnh thơm phức, nước chấm chua ngọt đặc trưng Hà Nội.',
    priceRange: '40,000 - 100,000 VND',
    type: 'Street Food',
    tags: ['Hanoi', 'Must-try'],
    recommendedPlaces: [
      { name: 'Bún chả Hương Liên', address: '24 Lê Văn Hưu, Hà Nội', phone: '024 3943 4106' },
      { name: 'Bún chả Cửa Đông', address: '41 Cửa Đông, Hà Nội', phone: '090 458 91 91' }
    ]
  },
  {
    id: 'f3',
    name: 'Bún Bò Huế',
    region: Region.CENTRAL,
    image: 'https://images.unsplash.com/photo-1620216447192-d61053df28d8?q=80&w=600',
    description: 'Nước dùng đậm đà vị mắm ruốc, sả và ớt, linh hồn ẩm thực Cố Đô.',
    priceRange: '40,000 - 80,000 VND',
    type: 'Restaurant',
    tags: ['Hue', 'Spicy'],
    recommendedPlaces: [
      { name: 'Bún bò Huế Mỹ Tâm', address: '24 Lê Duẩn, Huế', phone: '090 523 00 24' },
      { name: 'Bún bò Huế O Phụng', address: '5 Nguyễn Du, Huế', phone: '093 516 33 22' }
    ]
  },
  {
    id: 'f6',
    name: 'Mì Quảng',
    region: Region.CENTRAL,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=600',
    description: 'Sợi mì vàng óng, nước lèo xâm xấp, ăn kèm bánh tráng nướng giòn rụm.',
    priceRange: '30,000 - 60,000 VND',
    type: 'Street Food',
    tags: ['Danang', 'Quang Nam'],
    recommendedPlaces: [
      { name: 'Mì Quảng Ếch Bếp Trang', address: '24 Pasteur, Đà Nẵng', phone: '090 658 83 23' },
      { name: 'Mì Quảng Bà Mua', address: '19 Trần Bình Trọng, Đà Nẵng', phone: '098 500 00 75' }
    ]
  },
  {
    id: 'f4',
    name: 'Cơm Tấm Sài Gòn',
    region: Region.SOUTH,
    image: 'https://images.unsplash.com/photo-1555948256-2a4074828100?q=80&w=600',
    description: 'Sườn nướng mật ong thơm ngất, bì thính, chả trứng hấp, linh hồn người Sài Gòn.',
    priceRange: '35,000 - 150,000 VND',
    type: 'Restaurant',
    tags: ['Saigon', 'Signature'],
    recommendedPlaces: [
      { name: 'Cơm tấm Ba Ghiền', address: '84 Đặng Văn Ngữ, Phú Nhuận, HCM', phone: '028 3846 1073' },
      { name: 'Cơm tấm Kiều Giang', address: '192 Trần Quang Khải, Q1, HCM', phone: '028 3848 4249' }
    ]
  },
  {
    id: 'f10',
    name: 'Chả Mực Hạ Long',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=600',
    description: 'Mực tươi giã tay công phu, chiên vàng thơm nức, đặc sản vùng Vịnh.',
    priceRange: '350,000 - 500,000 VND/kg',
    type: 'Restaurant',
    tags: ['Halong', 'Seafood'],
    recommendedPlaces: [
      { name: 'Chả mực Quang Phong', address: 'Kiot 46, chợ Hạ Long 1, Quảng Ninh', phone: '097 864 66 99' },
      { name: 'Chả mực Thoan', address: 'Kiot 36, chợ Hạ Long 1, Quảng Ninh', phone: '0203 362 56 10' }
    ]
  },
  {
    id: 'f11',
    name: 'Bún Cá Sứa Nha Trang',
    region: Region.CENTRAL,
    image: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=600',
    description: 'Sứa trắng giòn sần sật, nước dùng cá dầm thanh mát đặc trưng xứ Trầm.',
    priceRange: '35,000 - 60,000 VND',
    type: 'Street Food',
    tags: ['Nhatrang', 'Fresh'],
    recommendedPlaces: [
      { name: 'Bún cá Nguyên Loan', address: '123 Ngô Gia Tự, Nha Trang', phone: '0258 351 01 96' },
      { name: 'Bún cá lá Ninh Hòa', address: '02 Lãn Ông, Nha Trang', phone: '0258 381 21 82' }
    ]
  },
  {
    id: 'f_saigon_bm',
    name: 'Bánh Mì Sài Gòn',
    region: Region.SOUTH,
    image: 'https://images.unsplash.com/photo-1620216447192-d61053df28d8?q=80&w=600',
    description: 'Ổ bánh mì giòn tan với pate béo ngậy, thịt nguội, bơ và dưa chua.',
    priceRange: '15,000 - 65,000 VND',
    type: 'Street Food',
    tags: ['Saigon', 'Global'],
    recommendedPlaces: [
      { name: 'Bánh mì Huỳnh Hoa', address: '26 Lê Thị Riêng, Q1, HCM', phone: '028 3925 3153' },
      { name: 'Bánh mì Hồng Hoa', address: '54 Nguyễn Văn Tráng, Q1, HCM', phone: '090 311 01 23' }
    ]
  },
  {
    id: 'f12',
    name: 'Bún Quậy Phú Quốc',
    region: Region.SOUTH,
    image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=600',
    description: 'Trải nghiệm tự pha nước chấm độc đáo, chả tôm mực xay tươi tại chỗ.',
    priceRange: '40,000 - 80,000 VND',
    type: 'Restaurant',
    tags: ['Phuquoc', 'Unique'],
    recommendedPlaces: [
      { name: 'Bún Quậy Kiến Xây', address: '28 Bạch Đằng, Phú Quốc', phone: '093 333 11 11' },
      { name: 'Bún Quậy Thanh Hùng', address: '75 Ba Mươi Tháng Tư, Phú Quốc', phone: '091 111 22 22' }
    ]
  },
  {
    id: 'f13',
    name: 'Cao Lầu Hội An',
    region: Region.CENTRAL,
    image: 'https://images.unsplash.com/photo-1616484173745-07f25fd0547f?q=80&w=600',
    description: 'Sợi mì tro giòn dai, thịt xá xíu đậm đà, hương vị cổ kính của Hội An.',
    priceRange: '35,000 - 55,000 VND',
    type: 'Street Food',
    tags: ['Hoian', 'Heritage'],
    recommendedPlaces: [
      { name: 'Cao lầu Thanh', address: '26 Thái Phiên, Hội An', phone: '090 511 22 33' },
      { name: 'Cao lầu Trung Bắc', address: '87 Trần Phú, Hội An', phone: '0235 386 14 62' }
    ]
  },
  {
    id: 'f14',
    name: 'Bánh Xèo Miền Tây',
    region: Region.SOUTH,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600',
    description: 'Vỏ bánh vàng giòn, nhân tôm thịt giá đỗ, cuộn cùng hàng chục loại rau rừng.',
    priceRange: '25,000 - 60,000 VND',
    type: 'Restaurant',
    tags: ['South', 'Crispy'],
    recommendedPlaces: [
      { name: 'Bánh xèo Mười Xiềm', address: '190 Nam Kỳ Khởi Nghĩa, Q3, HCM', phone: '028 3933 0207' },
      { name: 'Bánh xèo 46A', address: '46A Đinh Công Tráng, Q1, HCM', phone: '028 3824 3934' }
    ]
  },
  {
    id: 'f15',
    name: 'Chả Cá Lã Vọng',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=600',
    description: 'Cá lăng nướng vàng trên mỡ sôi cùng thì là và hành lá, tinh túy Hà Thành.',
    priceRange: '150,000 - 250,000 VND',
    type: 'Fine Dining',
    tags: ['Hanoi', 'Legacy'],
    recommendedPlaces: [
      { name: 'Chả Cá Lã Vọng Nguyễn Trường Tộ', address: '107 Nguyễn Trường Tộ, Hà Nội', phone: '024 3823 9875' },
      { name: 'Vua Chả Cá', address: '26C Trần Hưng Đạo, Hà Nội', phone: '096 175 32 32' }
    ]
  },
  {
    id: 'f16',
    name: 'Bánh Cuốn Thanh Trì',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1620216447192-d61053df28d8?q=80&w=600',
    description: 'Lớp bánh mỏng tang như lụa, thoảng hương gạo mới, ăn kèm chả quế.',
    priceRange: '25,000 - 50,000 VND',
    type: 'Street Food',
    tags: ['Hanoi', 'Silk'],
    recommendedPlaces: [
      { name: 'Bánh cuốn bà Hoành', address: '66 Tô Hiến Thành, Hà Nội', phone: '024 3976 1325' },
      { name: 'Bánh cuốn Thanh Vân', address: '81 Lê Văn Hưu, Hà Nội', phone: '098 123 45 67' }
    ]
  },
  {
    id: 'f17',
    name: 'Bún Đậu Mắm Tôm',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600',
    description: 'Đậu rán giòn, bún lá, thịt chân giò luộc, và mắm tôm nồng nàn.',
    priceRange: '35,000 - 70,000 VND',
    type: 'Street Food',
    tags: ['Hanoi', 'Flavorful'],
    recommendedPlaces: [
      { name: 'Bún đậu mắm tôm Trung Yên', address: '8 Ngõ Trung Yên, Hà Nội', phone: '091 222 33 44' },
      { name: 'Bún đậu Cây Đa', address: '235 Thụy Khuê, Hà Nội', phone: '094 555 66 77' }
    ]
  },
  {
    id: 'f18',
    name: 'Phở Khô Gia Lai',
    region: Region.CENTRAL,
    image: 'https://images.unsplash.com/photo-1620216447192-d61053df28d8?q=80&w=600',
    description: 'Phở "hai tô" độc đáo, bánh phở nhỏ dai cùng nước lèo thanh ngọt.',
    priceRange: '40,000 - 65,000 VND',
    type: 'Restaurant',
    tags: ['Gialai', 'Central Highlands'],
    recommendedPlaces: [
      { name: 'Phở khô Hồng', address: '22 Nguyễn Văn Trỗi, Pleiku', phone: '0269 382 52 14' },
      { name: 'Phở khô Ngọc Sơn', address: '15 Nguyễn Thái Học, Pleiku', phone: '0269 382 21 04' }
    ]
  },
  {
    id: 'f19',
    name: 'Bánh Đa Cua Hải Phòng',
    region: Region.NORTH,
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=600',
    description: 'Sợi bánh đa đỏ đặc sản, gạch cua béo ngậy, chả lá lốt thơm lừng.',
    priceRange: '30,000 - 60,000 VND',
    type: 'Street Food',
    tags: ['Haiphong', 'Local'],
    recommendedPlaces: [
      { name: 'Bánh đa cua Bà Cụ', address: '179 Cầu Đất, Hải Phòng', phone: '0225 359 26 23' },
      { name: 'Bánh đa cua Lạch Tray', address: '48 Lạch Tray, Hải Phòng', phone: '090 444 55 66' }
    ]
  },
  {
    id: 'f20',
    name: 'Gỏi Cá Trích Phú Quốc',
    region: Region.SOUTH,
    image: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=800',
    description: 'Cá tươi lôi từ biển, trộn cùng dừa nạo và lạc rang, gói trọn hương vị đảo ngọc.',
    priceRange: '120,000 - 200,000 VND',
    type: 'Restaurant',
    tags: ['Phuquoc', 'Raw'],
    recommendedPlaces: [
      { name: 'Nhà hàng Ra Khơi', address: '131 Ba Mươi Tháng Tư, Phú Quốc', phone: '091 849 20 00' },
      { name: 'Nhà hàng Sông Xanh', address: 'Đường 30/4, Dương Đông, Phú Quốc', phone: '0297 370 29 29' }
    ]
  }
];

export const REGION_COLORS = {
  [Region.NORTH]: 'fill-red-400 hover:fill-red-500',
  [Region.CENTRAL]: 'fill-yellow-400 hover:fill-yellow-500',
  [Region.SOUTH]: 'fill-green-400 hover:fill-green-500'
};