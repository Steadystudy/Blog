## 개발 기간: 25.03.04 ~ 25.04.10 (약 6주)

이번 프로젝트는 '핀테크'를 주제로, 개발보다는 **기획과 문제 해결 방식**에 더 많은 시간을 들인 경험이었습니다.  
단순히 기능을 구현하기보다는 주어진 금융 챌린지를 어떻게 사용자 경험으로 풀어낼지를 중심으로 고민했고, 그 과정에서 결제 파트를 맡아 **금융 도메인에 대한 깊은 이해**를 쌓을 수 있었습니다.  
특히 SSAFY에서 제공하는 금융 API를 활용해 은행과 VAN사 기능을 만들어보며, 실제 결제 흐름(토큰 발급 → 인증 → 처리 → 응답)에 대한 실질적인 경험을 할 수 있었습니다. 프로젝트를 인정받아 본선에서 발표하여 우수상을 받은 뜻깊은 프로젝트였습니다.

📌 프로젝트 개요

비대면 선물 문화가 일상이 된 요즘, 누구나 손쉽게 원하는 매장의 기프티콘을 만들고 선물할 수 있는 **자체 페이 기반 기프티콘 서비스**를 구축하는 것이 이번 프로젝트의 목표였습니다.

기존처럼 기업 중심이 아닌, **개인이 직접 가게와 메뉴를 선택해 기프티콘을 제작**하고 친구나 지인에게 선물할 수 있도록 설계했습니다. 이를 통해 **소상공인 매장의 접근성을 높이고, 선물 문화의 다양성**도 함께 확장하고자 했습니다.

사용자는 복잡한 절차 없이 자체 페이를 통해 선물할 수 있고, 가맹점은 별도의 인프라 없이 디지털 고객을 확보할 수 있어 **양측 모두에 혜택이 돌아가는 구조**를 만들고자 했습니다.

### 🧩 챌린지 & 해결 과정

### 1️⃣ 문제 정의: "기프티콘을 상점이 몰라도 쓸 수 있게 하자"

기존 기프티콘은 **상점과 기프티콘 발행 회사 간 협약**이 필요해, 사용자는 해당 브랜드 내에서만 사용할 수 있었습니다.

하지만 이번 프로젝트에서는 **누구나 직접 기프티콘을 만들고**, **상점 주인이 서비스를 몰라도 결제가 가능한 구조**를 목표로 했습니다.

---

### 2️⃣ 첫 번째 시도: 계좌이체 방식

초기에는 **가게의 계좌를 사용자가 직접 입력**하여 이체하는 방식으로 기프티콘을 만들고자 했습니다.

하지만 이 방식은 다음과 같은 문제점이 있었습니다:

- 사용자가 메뉴명과 계좌번호를 직접 입력해야 해 **사용자 부담이 큼**
- **계좌정보 저장**이라는 민감한 문제 발생 가능성
- **UX 흐름이 너무 복잡**함

결국 이 방식은 보안성과 사용자 경험 측면에서 적합하지 않아 제외하게 되었습니다.

---

### 3️⃣ 해결 아이디어: 기존 결제 인프라를 유지하며 연결하기

기존 인프라를 건드리지 않고 결제만 연결하는 방식으로 **NFC 기반 결제**를 도입하기로 했습니다.

POS 시스템과 서비스 간 협업이 필요하다는 가정은 있었지만, 실제 구현에서 큰 장벽은 없었습니다.

- **결제 유효성 판단 방법**:
  기프티콘은 특정 매장에서만 사용 가능해야 하기 때문에,
  → 사용자의 **현재 위치(GPS)**를 받아 상점의 위치와 비교하는 로직을 통해 매장 검증을 수행했습니다.
- **호환성 확보를 위한 추가 구현**:
  NFC를 사용할 수 없는 환경을 고려하여 **QR 결제 기능도 함께 구현**,
  `react-qr-code`를 활용하여 다양한 환경에서 기프티콘 사용이 가능하도록 확장했습니다.

---

### 4️⃣ 기술적 문제: HCE 구현의 제약

- React Native에서 NFC를 구현하려 했지만,
  **기존 라이브러리의 호환성이 부족했고 안정성이 떨어졌습니다.**

✅ 그래서 직접 해결한 방법:

- Kotlin으로 HCE 기반 NFC 결제 모듈을 직접 제작하여 react-native에서 사용함
- `react-native-hce`와 여러 오픈소스를 참고하여 **웹과 앱 간 통신, 토큰 전송, 카드 에뮬레이션 처리까지 직접 설계**
- 이 과정을 통해 NFC 결제의 전체 흐름을 온전히 이해하고, 실제 기기 테스트까지 완료했습니다.

<details>
<summary>직접 만든 모듈 (코드 주의)</summary>

```kotlin
// CardService.kt
package com.mobile.nfc

import android.nfc.cardemulation.HostApduService
import android.os.Bundle
import android.widget.Toast
import java.util.Arrays

private const val TAG = "CardService_싸피"
class CardService : HostApduService() {

    override fun onDeactivated(reason: Int) {}

    // BEGIN_INCLUDE(processCommandApdu)
    override fun processCommandApdu(commandApdu: ByteArray, extras: Bundle?): ByteArray {
        // If the APDU matches the SELECT AID command for this service,
        val EXTRA_DATA_STRING = savedData

        return if (Arrays.equals(SELECT_APDU, commandApdu)) {
            val account = EXTRA_DATA_STRING
            val accountBytes = account!!.toByteArray()

            concatArrays(accountBytes, SELECT_OK_SW)
        } else {
            UNKNOWN_CMD_SW
        }
    }

    companion object {
        // AID for our loyalty card service.
        private const val SAMPLE_LOYALTY_CARD_AID = "F222222233"

        // ISO-DEP command HEADER for selecting an AID.
        // Format: [Class | Instruction | Parameter 1 | Parameter 2]
        private const val SELECT_APDU_HEADER = "00A40400"

        // "OK" status word sent in response to SELECT AID command (0x9000)
        private val SELECT_OK_SW = hexStringToByteArray("9000")

        // "UNKNOWN" status word sent in response to invalid APDU command (0x0000)
        private val UNKNOWN_CMD_SW = hexStringToByteArray("0000")
        private val SELECT_APDU = buildSelectApdu(SAMPLE_LOYALTY_CARD_AID)
        // END_INCLUDE(processCommandApdu)

        // 데이터 저장 정적 변수
        var savedData: String? = null

        fun buildSelectApdu(aid: String): ByteArray {
            // Format: [CLASS | INSTRUCTION | PARAMETER 1 | PARAMETER 2 | LENGTH | DATA]
            return hexStringToByteArray(
                SELECT_APDU_HEADER + String.format(
                    "%02X",
                    aid.length / 2
                ) + aid
            )
        }

        fun byteArrayToHexString(bytes: ByteArray): String {
            val hexArray = charArrayOf('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F')
            val hexChars = CharArray(bytes.size * 2) // Each byte has two hex characters (nibbles)
            var v: Int
            for (j in bytes.indices) {
                v = bytes[j].toInt() and 0xFF // Cast bytes[j] to int, treating as unsigned value
                hexChars[j * 2] = hexArray[v ushr 4] // Select hex character from upper nibble
                hexChars[j * 2 + 1] = hexArray[v and 0x0F] // Select hex character from lower nibble
            }
            return String(hexChars)
        }

        @Throws(IllegalArgumentException::class)
        fun hexStringToByteArray(s: String): ByteArray {
            val len = s.length
            require(len % 2 != 1) { "Hex string must have even number of characters" }
            val data = ByteArray(len / 2) // Allocate 1 byte per 2 hex characters
            var i = 0
            while (i < len) {
                // Convert each character into a integer (base-16), then bit-shift into place
                data[i / 2] = ( (s[i].digitToIntOrNull(16)!!.shl(4))
                        + s[i + 1].digitToIntOrNull(16)!!).toByte()
                i += 2
            }
            return data
        }

        fun concatArrays(first: ByteArray, vararg rest: ByteArray): ByteArray {
            var totalLength = first.size
            for (array in rest) {
                totalLength += array.size
            }
            val result = Arrays.copyOf(first, totalLength)
            var offset = first.size
            for (array in rest) {
                System.arraycopy(array, 0, result, offset, array.size)
                offset += array.size
            }
            return result
        }
    }
}
```

```kotlin
// NFCModule.kt
package com.mobile.nfc

import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NfcModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    //js에서 접근할 이름
    override fun getName(): String {
        return "DdopayNFC"
    }

    // 접근 후에 부를 메소드
    // @ReactMethod 어노테이션 필수
    @ReactMethod
    fun startNfcService(inputedData : String) {
        val intent = Intent(
            reactApplicationContext,
            CardService::class.java
        )
        CardService.savedData = inputedData
        reactApplicationContext.startService(intent)
    }
}
```

```kotlin
// NFCPackage.kt
package com.mobile.nfc

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class NfcPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(NfcModule(reactContext)) // NfcModule을 추가
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList() // ViewManager는 사용하지 않으므로 빈 리스트를 반환
    }
}
```

```kotlin
// MainApplication.kt
package com.mobile
...
import com.mobile.nfc.NfcPackage

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
                // Packages that cannot be autolinked yet can be added manually here, for example:
                // add(MyReactNativePackage())
                add(NfcPackage())
            }
                ...
        }
    ...
}
```

</details>

## 결제 로직

기프티콘 사용 가능 여부 판단

📌 어떤 기준으로 기프티콘 사용 가능 여부를 판단하는가?

- 사용자 현재 위치와 가게 위치 비교→ 사용 가능한 가게에서만 NFC 결제 가능
- 결제 비밀번호 확인 → 해당 사용자가 맞는지 2차 검증
- 기프티콘 사용 유무 → 이미 사용한 기프티콘이라면 결제 불가능
- 기프티콘 유효기간 → 유효기간이 지난 기프티콘은 결제 불가능

📌 현재 위치와 가게 위치 비교

- GPS는 보통 **15m 내**의 오차 범위를 갖는다.
- 거리 계산 : **Haversine** 공식 사용

### 2️⃣ 토큰 발급

> **UUID / NFC + HCE / Redis**

📌 `백엔드(서버 1)는 레디스에 저장한다.`

- 6분의 유효기간으로 잡고 gift_id, amount, token을 저장한 후 프론트로 전달

📌 `모바일 (프론트 1)은 아래와 같이 동작한다.`

1. 웹에서 서버로 기프티콘 사용 API 요청 → 결제 토큰 수신

2. postMessage로 토큰을 React Native 앱으로 전달

3. onMessage 이벤트에서 type으로 메시지 분기

4. 결제 요청일 경우 토큰을 결제 모듈에 전달

5. HCE 방식으로 휴대폰 NFC 모듈에 토큰 탑재

6. 카드 리더기에 토큰 전송

📌 `포스기(프론트 2)는 아래와 같이 동작한다.`

1. POS에서는 토큰의 결제 유무 판단을 위해 토큰 + 결제금액 + 가게계좌를 백엔드 서버로 전송.

2. 레디스 토큰을 조회하여 레디스 내에 amount와 POS가 요청한 결제 금액을 비교해 결제 가능 여부를 판단.

📌 `가계 계좌를 보내는 이유는?`

- 우리 서비스는 VAN사 서버 구현을 하지 않아 백엔드 서버에서 VAN사의 기능 역할을 담당하고 있다.

### 3️⃣ 결제

📌 `백엔드(서버 1)는 아래와 같이 동작한다.`

1. 결제가 가능한 것을 판단한 후, 은행 서버로 가계 계좌, 법인 계좌, 결제 금액을 보내며 계좌 이체를 요청.

2. 결제 금액은 카드 수수료인 1%를 제외한 99%가 이체되며 수수료의 0.5%는 기프티콘 발행자의 포인트로 적립되고, 0.5%는 법인계좌에 묶여 수익 창출.

3. 은행 서버는 금융망 API를 이용해 법인계좌(출금계좌)에서 가계계좌(입금계좌)로 99%의 금액에 대해 계좌 이체를 요청.

### 4️⃣ 결제 성공

- SSE를 이용해 서버로부터 결제 결과 화면을 제공한다.

## 프론트엔드

**주요 기술스택**

| 기술               | 사용이유                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js v.15.3.0   | - React 기반 프레임워크로, 개발 편의성 제공하여 비즈니스 로직에 집중 가능 & 14버전을 사용하다가 미들웨어 보안 이슈 대응을 위해 급히 15.3.0으로 마이그레이션 |
| react-native v0.78 | - 크로스 플랫폼 개발과 네이티브 앱 성능 등 유용한 장점 & 선택의 가장 큰 이유는 react에 대한 이해와 대중적인 커뮤니티와 생태계                               |

**웹 추가 라이브러리**

- zustand(상태관리), motion(앱 사용 경험과 비슷한 애니메이션), shadcn/ui & tailwindcss

**모바일 추가 라이브러리**

- react-native-webview, react-native-permission

### 구현 사항

**지도 기능**

- Kakao 지도 API를 활용하여 카테고리, 키워드 기반 매장 탐색 기능 구현

- 사용자의 맛집 및 보유 기프티콘 매장 위치를 지도에 표시

**앱 내 애니메이션**  
적용전  
<img src="/storeonemore/no_animation.gif" width="400" height="600" alt="애니메이션 적용전"/>

적용후  
<img src="/storeonemore/motion_animation.gif" width="260" height="500" alt="애니메이션 적용후"/>

- Next.js 페이지 전환 시 앱과 유사한 부드러운 인터랙션 제공 목적으로 motion (framer-motion) 기반 모션 효과 구현

- 반복 사용되는 애니메이션을 컴포넌트화하여 재사용성과 유지보수 효율 확보

- 경로가 바뀔 때마다 page key 값을 바꾸어 애니메이션 실행

**결제 기능**

- NFC 모듈 구현(HCE 방식): react-native 앱 내에서 NFC 접근 처리

- postMessage를 이용해 웹 <–> 앱 간 통신 구조 설계 및 구현

- 결제 요청 시 서버로부터 token 수신 → NFC로 전달 → 결제 처리

- `SSE(Server-Sent Events)`를 활용하여 결제 완료 여부 실시간 수신 및 결과 표시

- QR 결제 기능: "react-qr-code"로 기프티콘별 QR 생성 기능 구현

### 성과

- 웹과 앱 간 통신 설계

  - 통신 분기 처리를 통해 이벤트 처리

- 결제 도메인 이해 및 커뮤니케이션 효율화
  - 결제 로직을 직접 설계 및 문서화
  - 서버·앱 개발자 간 협업을 원활하게 만들며 커뮤니케이션 비용 절감

### 배운점

**직접 모듈 구현을 통한 문제 해결**

- NFC 결제 구현 시 활용 가능한 라이브러리가 부족해 모듈을 직접 개발

- 다양한 오픈소스를 분석하며 문제 해결 역량과 기술 탐색 능력을 강화

**페어 프로그래밍을 통한 동료 성장 지원**

- 프론트엔드 경험이 적은 팀원과 개념 정리부터 함께하며 실력을 끌어올림

- 질문의 방향을 정리해주는 방식으로 효과적인 커뮤니케이션을 실천
- 상대 입장을 고려한 설명과 피드백을 통해 실력뿐만 아니라 협업 역량까지 함께 성장
