# الدوال المساعدة (Utils)

هذا المجلد يحتوي على الدوال المساعدة المستخدمة في المشروع.

## userUtils.js

دوال مساعدة لمعالجة بيانات المستخدم.

### formatUserName(user)
تنسيق اسم المستخدم الكامل.

```javascript
import { formatUserName } from '../Utils/userUtils';

const userName = formatUserName(user);
// النتيجة: "أحمد محمد" أو "أحمد" أو "محمد" أو "المستخدم 123"
```

**المعاملات:**
- `user`: Object - بيانات المستخدم

**القيمة المُرجعة:**
- `string`: الاسم المنسق

### getUserInitials(user)
الحصول على الحروف الأولى من اسم المستخدم.

```javascript
import { getUserInitials } from '../Utils/userUtils';

const initials = getUserInitials(user);
// النتيجة: "أم" أو "أ" أو "م" أو "1"
```

**المعاملات:**
- `user`: Object - بيانات المستخدم

**القيمة المُرجعة:**
- `string`: الحروف الأولى

### hasUserName(user)
التحقق من وجود اسم المستخدم.

```javascript
import { hasUserName } from '../Utils/userUtils';

const hasName = hasUserName(user);
// النتيجة: true أو false
```

**المعاملات:**
- `user`: Object - بيانات المستخدم

**القيمة المُرجعة:**
- `boolean`: هل يوجد اسم

## الميزات

✅ **معالجة الحالات الفارغة** - التعامل مع البيانات المفقودة  
✅ **تنسيق ذكي** - عرض الاسم بالشكل الأمثل  
✅ **دعم اللغة العربية** - تنسيق مناسب للعربية  
✅ **أداء محسن** - دوال سريعة وفعالة  