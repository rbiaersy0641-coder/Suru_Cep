/**
 * Buzağı için tek bir bakım kaydı.
 *
 * @typedef {Object} CalfCareRecord
 * @property {string} id Bakım kaydının kimliği
 * @property {string} date Bakımın yapıldığı tarih
 * @property {string} type Bakım türü
 * @property {string} note Kısa açıklama
 */

/**
 * Buzağı kaydında kullanacağımız alanlar.
 *
 * @typedef {Object} Calf
 * @property {string} id Uygulama içindeki benzersiz kimlik
 * @property {string} earTag Küpe numarası
 * @property {string} name Buzağının adı
 * @property {string} birthDate Doğum tarihi
 * @property {string} motherTag Anne küpe numarası
 * @property {CalfCareRecord[]} careRecords Bakım kayıtları
 */