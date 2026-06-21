from fastapi import Header
from fastapi import HTTPException


async def verify_api_key(
    x_api_key: str = Header(
        default=""
    )
):

    if not x_api_key:

        raise HTTPException(
            status_code=401,
            detail="Missing API Key"
        )

    return True