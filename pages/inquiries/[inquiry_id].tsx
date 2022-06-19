import { NextPage } from "next";
import { useRouter } from "next/router";
import { Inquiry } from "../contact";




type PageProps = {
    inquiry: Inquiry;
}

// 購入者もこのページに入って、firestoreにアクセスするから、つまり、認証しなくてはならない。
// この場合、購入者のuidでパスワードとメールアドレスを発行してで新規登録して、buyersというコレクションでに保存するか。
// あるいは、毎回、データをポストするごとに匿名ログインさせるか
// queryをもとに、チャットを取得する
// messages uid(query)  messageId field
const InquiryPage: NextPage<PageProps> = ({ inquiry }) => {
    const router = useRouter();

    // ここでstaffなのか購入者なのかの判定をする

    return (
        <div>
            <h2>お問い合わせID：{router.query.name}のページです</h2>
        </div>
    );
}

export default InquiryPage;
