import { ConnectButton } from "@rainbow-me/rainbowkit";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConnectButtonCustom(props: any) {
  const router = useRouter();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="m-0 px-4 py-2 font-semibold text-ghostWhite bg-sunsetOrange hover:bg-royalBlue hover:text-white rounded-md md:ml-5"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="m-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-3 rounded-lg">
                  <button
                    onClick={openAccountModal}
                    className="flex items-center px-4 py-2 font-bold text-ghostWhite bg-sunsetOrange hover:bg-royalBlue hover:text-ghostWhite rounded-md md:ml-5"
                    type="button"
                  >
                    {account.displayName}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {connected ? (
                    <User
                      className="cursor-pointer p-2 h-10 w-10 text-ghostWhite bg-sunsetOrange hover:bg-royalBlue hover:text-ghostWhite rounded-md md:ml-5"
                      onClick={() => router.push(`/profile/${account.address}`)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
