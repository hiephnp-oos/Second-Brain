/**
 * ======================================================================================
 * FILE: GChat.gs
 * MODULE: Google Chat Notification Engine
 * * DESCRIPTION:
 * - Trung tâm xử lý thông báo gửi về Google Chat thông qua Webhook.
 * - Được thiết kế theo dạng Universal Function (Fire-and-Forget) để các module khác
 * (Import, Scanner, Health Check) có thể gọi chung.
 * * DEPENDENCIES:
 * - Config.gs (Đọc biến CONFIG.MAINTENANCE_WEBHOOK).
 * * AUTHOR: SheetScript Architect / Hoàng Nguyên Phước Hiệp
 * LAST UPDATED: 16/06/2026 | VERSION: V1.0
 * ======================================================================================
 */

/**
 * Hàm dùng chung (Universal) để bắn thông báo Google Chat từ mọi nơi trong hệ thống
 * @param {string} messageText Nội dung tin nhắn (Hỗ trợ định dạng Markdown của Google Chat)
 */
function sendSystemAlertToChat(messageText) {
  const webhookUrl = (typeof CONFIG !== 'undefined' && CONFIG.MAINTENANCE_WEBHOOK) 
                      ? CONFIG.MAINTENANCE_WEBHOOK : "";
  
  if (!webhookUrl) {
    console.warn("Chưa cấu hình MAINTENANCE_WEBHOOK trong Config.gs. Đã bỏ qua gửi thông báo Chat.");
    return;
  }

  const payload = {
    "text": messageText
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true // Bắt buộc để catch lỗi an toàn (P-O standard)
  };

  try {
    const response = UrlFetchApp.fetch(webhookUrl, options);
    if (response.getResponseCode() !== 200) {
      console.error('Chat API error ' + response.getResponseCode() + ': ' + response.getContentText());
    }
  } catch (e) {
    console.error("Lỗi khi gọi Google Chat Webhook: " + e.message);
  }
}

function sendDeltaNotificationToChat(sheetName, addedCodes = [], modifiedCodes = []) {
  const nowStr = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm");
  
  // Base message: In đậm tên sheet và thời gian
  let messageText = `*[MASTER DATA]* Đã cập nhật *${sheetName}* mới nhất vào lúc *${nowStr}*.`;
  
  const displayLimit = 15; // Giới hạn số mã hiển thị để chống crash API Chat

  // 1. Nhóm BOM thay đổi (Xuống dòng, in đậm từng mã)
  if (modifiedCodes && modifiedCodes.length > 0) {
    const count = modifiedCodes.length;
    const displayCodes = modifiedCodes.slice(0, displayLimit).map(c => `*${c}*`).join(", ");
    messageText += `\nBom update: ${displayCodes}`;
    
    if (count > displayLimit) {
      messageText += `... (+${count - displayLimit} mã).`;
    } else {
      messageText += `.`;
    }
  }

  // 2. Nhóm Mã mới (Xuống dòng, in đậm từng mã)
  if (addedCodes && addedCodes.length > 0) {
    const count = addedCodes.length;
    const displayCodes = addedCodes.slice(0, displayLimit).map(c => `*${c}*`).join(", ");
    messageText += `\nNew SKU: ${displayCodes}`;
    
    if (count > displayLimit) {
      messageText += `... (+${count - displayLimit} mã).`;
    } else {
      messageText += `.`;
    }
  }

  sendSystemAlertToChat(messageText);
}