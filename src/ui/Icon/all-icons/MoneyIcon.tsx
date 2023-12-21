import * as React from "react";
import { SvgProps } from "../utils";
export const MoneyIcon = (props: SvgProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
        <path d="M27.1512 20.9401C26.9896 21.1155 26.8434 21.3277 26.6601 21.4612C24.1318 23.3081 21.5971 25.1412 19.0672 26.9871C18.9481 27.0859 18.81 27.1443 18.6668 27.1566C18.5236 27.1688 18.3804 27.1344 18.2513 27.0569C14.9271 25.3029 11.5995 23.5559 8.26826 21.8158C5.99739 20.6204 3.72732 19.4249 1.45806 18.2295C1.21573 18.101 1.02187 17.9306 1.01864 17.574C1.01864 17.2612 1.18019 17.0848 1.38375 16.9434C1.98553 16.5329 2.58569 16.1095 3.22786 15.6672C2.93868 15.5188 2.68585 15.3883 2.43302 15.2598C2.0865 15.0834 1.74078 14.9061 1.39344 14.7328C1.16646 14.6202 0.989562 14.4509 0.967752 14.1271C0.945943 13.8033 1.11153 13.6091 1.3264 13.4626C1.87082 13.091 2.41283 12.7145 2.95483 12.3399C3.03561 12.2841 3.11154 12.2213 3.22059 12.1406C2.59377 11.8209 1.99845 11.521 1.40556 11.2142C1.10426 11.0568 0.934634 10.7639 1.02672 10.463C1.0989 10.2568 1.22071 10.0829 1.37567 9.96493C1.8999 9.57342 2.44191 9.21877 2.97664 8.84918C3.05015 8.79837 3.12123 8.74358 3.22301 8.66887C2.6285 8.37 2.06469 8.07812 1.50249 7.78822C1.39964 7.73932 1.30112 7.67756 1.20846 7.60392C1.14491 7.55044 1.09221 7.47959 1.05449 7.39689C1.01676 7.31419 0.995018 7.22186 0.990954 7.1271C0.986889 7.03235 1.00061 6.93771 1.03105 6.85056C1.06149 6.76341 1.10783 6.6861 1.16646 6.62465C1.25267 6.53955 1.34548 6.46514 1.44352 6.40249C3.97449 4.64585 6.50547 2.88887 9.03644 1.13156C9.15703 1.03747 9.29485 0.982238 9.43725 0.970924C9.57965 0.95961 9.72208 0.99258 9.85146 1.06681C11.6681 1.99328 13.4928 2.89584 15.3111 3.81634C19.0892 5.72773 22.8671 7.64078 26.6447 9.55549C26.8677 9.66806 27.0486 9.81749 27.1512 10.0865V10.4023C27.009 10.5736 26.8863 10.7808 26.7223 10.9093C26.2635 11.27 25.7885 11.5977 25.32 11.9394C25.2093 12.0201 25.1011 12.1068 24.9622 12.2144C25.5454 12.5083 26.093 12.7643 26.6253 13.0651C26.8208 13.1757 26.9767 13.3899 27.1512 13.5573V13.9358C26.9896 14.1121 26.8418 14.3184 26.6617 14.4578C26.1714 14.8384 25.6673 15.189 25.1698 15.5537C25.11 15.5975 25.0559 15.6533 24.9751 15.723C25.5664 16.0219 26.1148 16.3098 26.6714 16.5768C26.8879 16.6764 27.0575 16.8288 27.156 17.0918V17.4046C27.0131 17.576 26.8887 17.7842 26.7239 17.9117C26.2069 18.3102 25.6738 18.6847 25.1472 19.0693C25.0955 19.1071 25.0494 19.1579 24.9799 19.2207C25.5518 19.5096 26.0995 19.7656 26.6318 20.0665C26.8265 20.1761 26.9824 20.3922 27.156 20.5596L27.1512 20.9401ZM25.4751 10.3315C25.3604 10.2718 25.2917 10.2319 25.2223 10.199C23.3313 9.24567 21.4395 8.29629 19.5526 7.33295C19.4751 7.28594 19.3883 7.26724 19.3024 7.27906C19.2165 7.29089 19.1352 7.33275 19.068 7.3997C17.1294 9.00558 15.1891 10.6065 13.2473 12.2024C13.1778 12.2602 13.11 12.322 13.0243 12.4017C13.1213 12.4584 13.1964 12.5013 13.2739 12.5471C14.9702 13.4377 16.6754 14.3223 18.3717 15.2219C18.4416 15.2655 18.5199 15.2848 18.598 15.2776C18.6762 15.2704 18.7512 15.237 18.8151 15.1811C20.9492 13.627 23.0858 12.0776 25.2247 10.5328C25.2934 10.475 25.3604 10.4172 25.4751 10.3315ZM18.1302 6.65055C18.0987 6.61568 18.0825 6.58679 18.0599 6.57583C17.2885 6.18731 16.5171 5.7968 15.7408 5.42223C15.6949 5.4088 15.6473 5.40718 15.6009 5.41746C15.5545 5.42775 15.5103 5.44972 15.471 5.482C13.2917 7.26455 11.1164 9.05373 8.94516 10.8496C8.90123 10.8905 8.86473 10.9423 8.83802 11.0017C8.81131 11.061 8.79497 11.1266 8.79007 11.1943C8.78199 14.2825 8.78522 17.3757 8.78038 20.466C8.77277 20.5421 8.7877 20.6191 8.82242 20.6828C8.85714 20.7465 8.90933 20.7926 8.96939 20.8126C9.71657 21.1922 10.4589 21.5857 11.2036 21.9722C11.261 22.0021 11.3232 22.018 11.4032 22.0489V21.6375C11.4032 18.6837 11.4032 15.73 11.3991 12.7762C11.3902 12.5939 11.4226 12.4121 11.4928 12.2512C11.563 12.0904 11.6682 11.9569 11.7965 11.8657C13.6495 10.3521 15.4988 8.83125 17.3442 7.30307C17.6059 7.08788 17.8644 6.87171 18.1302 6.65055ZM14.4411 4.76971C12.807 3.94286 11.2182 3.13493 9.62529 2.34096C9.52254 2.31209 9.4147 2.33389 9.32481 2.40173C7.18479 3.8781 5.04693 5.35913 2.91122 6.84481C2.84983 6.88665 2.79409 6.94443 2.7117 7.00819C2.81832 7.06597 2.88698 7.10781 2.95403 7.14268C4.63739 8.02631 6.32237 8.90596 8.00251 9.79857C8.06823 9.84054 8.14247 9.8579 8.21609 9.84852C8.28972 9.83914 8.35951 9.80343 8.41689 9.74577C10.341 8.15183 12.2675 6.56421 14.1964 4.9829C14.2675 4.92612 14.3337 4.86435 14.4411 4.76971ZM25.4589 20.8385C24.9646 20.5785 24.4953 20.3404 24.0333 20.0814C23.9705 20.0417 23.9001 20.0242 23.8298 20.0309C23.7595 20.0376 23.6921 20.0682 23.635 20.1193C22.1197 21.2261 20.5963 22.3179 19.0841 23.4327C18.9587 23.5378 18.8129 23.6 18.6617 23.613C18.5104 23.6259 18.359 23.5891 18.2231 23.5064C16.3943 22.5401 14.5575 21.5947 12.7238 20.6423C12.6431 20.5994 12.555 20.5666 12.4379 20.5148C12.4379 21.1444 12.4476 21.7311 12.4339 22.3159C12.4282 22.543 12.4953 22.6437 12.6608 22.7293C14.5499 23.7096 16.4366 24.6975 18.3208 25.6931C18.401 25.7457 18.4913 25.7706 18.582 25.7649C18.6728 25.7593 18.7606 25.7235 18.8361 25.6612C20.96 24.1104 23.0871 22.5653 25.2174 21.0258C25.2885 20.973 25.3604 20.9162 25.4589 20.8385ZM25.4589 13.8352C24.9848 13.5941 24.5349 13.3769 24.0938 13.1379C24.016 13.0885 23.9288 13.0661 23.8415 13.0729C23.7542 13.0798 23.67 13.1156 23.5979 13.1767C22.0898 14.2825 20.5728 15.3684 19.0655 16.4771C18.9464 16.576 18.8083 16.6343 18.665 16.6462C18.5218 16.6581 18.3785 16.6231 18.2497 16.5449C16.4201 15.5746 14.5857 14.6192 12.7521 13.6559C12.6617 13.6091 12.5688 13.5682 12.4403 13.5064C12.4403 14.1301 12.4516 14.7019 12.4355 15.2807C12.4282 15.5297 12.4928 15.6483 12.6778 15.7449C14.576 16.7292 16.4718 17.7221 18.3652 18.7236C18.4358 18.7667 18.5145 18.7856 18.593 18.778C18.6715 18.7705 18.7468 18.7369 18.8111 18.6807C20.936 17.1287 23.0631 15.5815 25.1924 14.0394C25.2748 13.9826 25.3507 13.9179 25.4565 13.8352H25.4589ZM12.4363 16.9982C12.4363 17.6517 12.4452 18.2394 12.4322 18.8272C12.4274 19.0424 12.4872 19.141 12.6439 19.2257C14.5647 20.2219 16.4834 21.2264 18.4 22.2392C18.4588 22.276 18.5247 22.2924 18.5905 22.2868C18.6564 22.2812 18.7197 22.2537 18.774 22.2073C20.928 20.6366 23.0844 19.0696 25.2433 17.5062C25.3039 17.4624 25.358 17.4066 25.4444 17.3319C24.9598 17.0858 24.5058 16.8706 24.0648 16.6276C23.995 16.5826 23.9165 16.5622 23.838 16.5687C23.7595 16.5752 23.6839 16.6083 23.6197 16.6644C22.1043 17.7742 20.5817 18.869 19.0688 19.9828C18.95 20.0821 18.8121 20.1409 18.669 20.1534C18.5259 20.1658 18.3826 20.1313 18.2538 20.0535C16.9613 19.3562 15.6568 18.6847 14.3563 18.0033C13.7344 17.6726 13.1091 17.3478 12.4363 16.9982ZM7.7513 16.6565C7.7513 15.9432 7.75614 15.2946 7.74483 14.6471C7.74483 14.5774 7.65356 14.4817 7.58813 14.4479C6.58166 13.9166 5.57304 13.3882 4.56227 12.8629C4.49653 12.8228 4.42088 12.8149 4.35064 12.841C3.80944 13.2066 3.27309 13.5861 2.68262 13.9986L7.7513 16.6565ZM7.7513 20.1581C7.7513 19.4608 7.75695 18.8322 7.74483 18.2036C7.73581 18.1528 7.71752 18.1052 7.69135 18.0645C7.66517 18.0237 7.6318 17.9909 7.59378 17.9685C6.58732 17.4318 5.57816 16.9005 4.56631 16.3745C4.49989 16.3329 4.42329 16.3234 4.35145 16.3476C3.80298 16.7152 3.25936 17.0958 2.68181 17.4963L7.7513 20.1581ZM2.68262 10.5029L7.7513 13.1548C7.7513 12.4574 7.75695 11.8298 7.74403 11.2022C7.7345 11.1518 7.71581 11.1047 7.68936 11.0645C7.66291 11.0243 7.6294 10.992 7.59136 10.9701C6.58651 10.4328 5.57816 9.90416 4.56631 9.38414C4.48398 9.34273 4.39177 9.34273 4.30944 9.38414C3.77875 9.74079 3.25451 10.1084 2.68262 10.5029Z" />
    </svg>
);
